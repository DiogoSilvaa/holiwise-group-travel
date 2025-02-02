import { db } from "@/lib/db";

export const addTripDestination = async (
  tripId: string,
  destinationId: string
) => {
  await db
    .insertInto("trip_destination")
    .values({
      trip_id: tripId,
      destination_id: destinationId,
    })
    .execute();

  return { tripId, destinationId };
};

export const removeTripDestination = async (
  tripId: string,
  destinationId: string
) => {
  await db
    .deleteFrom("trip_destination")
    .where("trip_id", "=", tripId)
    .where("destination_id", "=", destinationId)
    .execute();

  return { tripId, destinationId };
};
