import { db } from "@/lib/db";
import { TripAllowedUsers } from "./types";

export const queryTripAccess = async (tripId: string): Promise<TripAllowedUsers> => {
  const rows = await db
    .selectFrom("trip_access as ta")
    .leftJoin("User as u", "u.id", "ta.user_id")
    .select(["ta.trip_id", "u.email"])
    .where("ta.trip_id", "=", tripId)
    .execute();

  const allowedEmails = rows.map((row) => row.email).filter((email) => email !== null);

  return {
    tripId,
    allowedEmails,
  };
};
