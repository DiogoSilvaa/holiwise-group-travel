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
  const { selected_destination_id } = await db
    .selectFrom("trip")
    .where("id", "=", tripId)
    .select(["selected_destination_id"])
    .executeTakeFirstOrThrow();

  if (selected_destination_id === destinationId) {
    await db
      .updateTable("trip")
      .set({ selected_destination_id: null })
      .execute();
  }

  await db
    .deleteFrom("trip_destination")
    .where("trip_id", "=", tripId)
    .where("destination_id", "=", destinationId)
    .execute();

  return { tripId, destinationId };
};
