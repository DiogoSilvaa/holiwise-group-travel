import { db } from "@/lib/db";
import { TripAccessPayload, TripAccessResult } from "./types";

export const addTripAccess = async (payload: TripAccessPayload): Promise<TripAccessResult> => {
  const { tripId, email } = payload;

  const user = await db
    .selectFrom("User")
    .select(["id", "email"])
    .where("email", "=", email.toLowerCase())
    .executeTakeFirst();

  if (!user) {
    throw new Error(`No user found with email: ${email}`);
  }

  await db
    .insertInto("trip_access")
    .values({
      trip_id: tripId,
      user_id: user.id,
    })
    .execute();

  return {
    tripId,
    userId: user.id,
    email: user.email,
  };
};

export const removeTripAccess = async (payload: TripAccessPayload): Promise<TripAccessResult> => {
  const { tripId, email } = payload;

  const user = await db
    .selectFrom("User")
    .select(["id", "email"])
    .where("email", "=", email)
    .executeTakeFirst();

  if (!user) {
    throw new Error(`No user found with email: ${email}`);
  }

  await db
    .deleteFrom("trip_access")
    .where("trip_id", "=", tripId)
    .where("user_id", "=", user.id)
    .execute();

  return {
    tripId,
    userId: user.id,
    email: user.email,
  };
};
