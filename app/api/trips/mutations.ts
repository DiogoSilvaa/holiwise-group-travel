import { db } from "@/lib/db";
import { TripPayload } from "./types";

export const createTrip = async (trip: TripPayload) => {
  const { userId, date, anywhere, destinationId } = trip;

  const [{ id }] = await db
    .insertInto("trip")
    .values({
      name: "Trip name",
      owner_id: userId,
      end_date: date?.start,
      start_date: date?.end,
      selected_destination_id: anywhere ? null : destinationId,
    })
    .returning("id")
    .execute();

  if (destinationId && !anywhere) {
    await db
      .insertInto("trip_destination")
      .values({ trip_id: id, destination_id: destinationId })
      .execute();
  }
};
