import { db } from "@/lib/db";
import { CompleteTrip } from "../types";

export const querySingleTrip = async (
  tripId: string,
  userId: string
): Promise<CompleteTrip | null> => {
  const trip = await db
    .selectFrom("trip as t")
    .leftJoin("User as u", "u.id", "t.owner_id")
    .leftJoin("trip_access as ta", "ta.trip_id", "t.id")
    .where("t.id", "=", tripId)
    .where((eb) => eb.or([eb("t.owner_id", "=", userId), eb("ta.user_id", "=", userId)]))
    .select([
      "t.id",
      "t.start_date",
      "t.end_date",
      "t.name",
      "u.email",
      "t.selected_destination_id",
      "t.status",
    ])
    .executeTakeFirst();

  if (!trip) return null;

  const destinations = await db
    .selectFrom("trip_destination as td")
    .innerJoin("destination as d", "d.id", "td.destination_id")
    .where("td.trip_id", "=", tripId)
    .select(["d.id", "d.image_url"])
    .execute();

  const selectedDestination = trip.selected_destination_id
    ? destinations.find((d) => d.id === trip.selected_destination_id)
    : null;

  const formattedTrip: CompleteTrip = {
    id: trip.id,
    imageUrls: selectedDestination
      ? [selectedDestination.image_url]
      : (destinations.map((d) => d.image_url).filter(Boolean) as string[]),
    name: trip.name,
    ownerEmail: trip.email ?? "",
    selectedDestinationId: trip.selected_destination_id || null,
    start: trip.start_date,
    end: trip.end_date,
    status: trip.status,
  };

  return formattedTrip;
};
