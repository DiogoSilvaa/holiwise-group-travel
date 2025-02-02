import { db } from "@/lib/db";
import { TripPayload } from "../types";

export const updateTrip = async (tripId: string, trip: Partial<TripPayload>) => {
  const { name, date, destinationId, status } = trip;

  const mappedTrip = {
    ...(name !== undefined && { name }),
    ...(date?.start !== undefined && { start_date: date.start }),
    ...(date?.end !== undefined && { end_date: date.end }),
    ...(destinationId !== undefined && {
      selected_destination_id: destinationId,
    }),
    ...(status !== undefined && { status }),
  };

  await db.updateTable("trip").set(mappedTrip).where("id", "=", tripId).execute();
};

export const deleteTrip = async (tripId: string) => {
  await db.deleteFrom("trip").where("id", "=", tripId).execute();

  return tripId;
};
