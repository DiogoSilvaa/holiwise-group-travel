import { db } from "@/lib/db";
import { CompleteTrip } from "./types";

export const querySingleTrip = async (
  tripId: string,
  userId: string
): Promise<CompleteTrip | null> => {
  const trip = await db
    .selectFrom("trip as t")
    .leftJoin("trip_destination as td", "t.id", "td.trip_id")
    .leftJoin("destination as d", "d.id", "td.destination_id")
    .leftJoin("User as u", "u.id", "t.owner_id")
    .leftJoin("trip_access as ta", "ta.trip_id", "t.id")
    .where("t.id", "=", tripId)
    .where((eb) =>
      eb.or([eb("t.owner_id", "=", userId), eb("ta.user_id", "=", userId)])
    )
    .select([
      "t.id",
      "t.start_date",
      "t.end_date",
      "t.name",
      "u.email",
      "d.id as destination_id",
      "d.image_url as destination_image",
      "t.selected_destination_id",
    ])
    .orderBy("t.created_at")
    .executeTakeFirstOrThrow();

  const formattedTrip: CompleteTrip = {
    id: trip.id,
    imageUrls: trip.destination_image ? [trip.destination_image] : [],
    name: trip.name,
    ownerEmail: trip.email ?? "",
    selectedDestination: trip.selected_destination_id,
    start: trip.start_date,
    end: trip.end_date,
    emailsWithAccess: [],
  };

  return formattedTrip;
};
