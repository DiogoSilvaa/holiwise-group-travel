import { db } from "@/lib/db";
import { TripPayload } from "./types";

export const createTrip = async (trip: TripPayload) => {
  const { userId, date, destinationId, name } = trip;

  const [{ id }] = await db
    .insertInto("trip")
    .values({
      name: name,
      owner_id: userId,
      end_date: date?.start,
      start_date: date?.end,
      selected_destination_id: destinationId,
    })
    .returning("id")
    .execute();

  if (destinationId) {
    await db
      .insertInto("trip_destination")
      .values({ trip_id: id, destination_id: destinationId })
      .execute();
  }

  return id;
};
