import { db } from "@/lib/db";
import { Trip } from "./types";

export const queryAllTrips = async (userId: string): Promise<Trip[]> => {
  const trips = await db
    .selectFrom("trip as t")
    .leftJoin("trip_destination as td", "t.id", "td.trip_id")
    .leftJoin("destination as d", "d.id", "td.destination_id")
    .leftJoin("User as u", "u.id", "t.owner_id")
    .leftJoin("trip_access as ta", "ta.trip_id", "t.id")
    .where((eb) => eb.or([eb("t.owner_id", "=", userId), eb("ta.user_id", "=", userId)]))
    .select([
      "t.id",
      "t.name",
      "u.email",
      "u.image",
      "d.id as destination_id",
      "d.image_url as destination_image",
      "t.selected_destination_id",
    ])
    .orderBy("t.created_at")
    .execute();

  const formattedTrips: Trip[] = Object.values(
    trips.reduce(
      (acc, trip) => {
        if (!acc[trip.id]) {
          acc[trip.id] = {
            id: trip.id,
            name: trip.name ?? "",
            ownerEmail: trip.email ?? "",
            selectedDestinationId: trip.selected_destination_id,
            imageUrls: [],
            destinationIds: [],
            ownerSrc: trip.image,
          };
        }

        if (trip.destination_id) {
          acc[trip.id].destinationIds.push(trip.destination_id);

          if (trip.selected_destination_id) {
            if (trip.destination_id === trip.selected_destination_id) {
              acc[trip.id].imageUrls = trip.destination_image ? [trip.destination_image] : [];
            }
          } else if (trip.destination_image) {
            acc[trip.id].imageUrls.push(trip.destination_image);
          }
        }

        return acc;
      },
      {} as Record<string, Trip>
    )
  );

  return formattedTrips;
};
