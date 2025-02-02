import { db } from "@/lib/db";
import { TripVotePayload, TripVoteResult } from "./types";

export const toggleTripVote = async (
  payload: TripVotePayload
): Promise<TripVoteResult> => {
  const { tripId, destinationId, userId } = payload;
  const existingVote = await db
    .selectFrom("trip_votes")
    .select(["trip_id"])
    .where("trip_id", "=", tripId)
    .where("destination_id", "=", destinationId)
    .where("user_id", "=", userId)
    .executeTakeFirst();

  if (existingVote) {
    await db
      .deleteFrom("trip_votes")
      .where("trip_id", "=", tripId)
      .where("destination_id", "=", destinationId)
      .where("user_id", "=", userId)
      .execute();
  } else {
    await db
      .insertInto("trip_votes")
      .values({
        trip_id: tripId,
        destination_id: destinationId,
        user_id: userId,
      })
      .execute();
  }

  const votesResult = await db
    .selectFrom("trip_votes")
    .select(db.fn.count("trip_id").as("total"))
    .where("trip_id", "=", tripId)
    .where("destination_id", "=", destinationId)
    .executeTakeFirstOrThrow();

  const vote = await db
    .selectFrom("trip_votes")
    .select(["trip_id"])
    .where("trip_id", "=", tripId)
    .where("destination_id", "=", destinationId)
    .where("user_id", "=", userId)
    .executeTakeFirst();

  return {
    totalVotes: Number(votesResult.total),
    hasVoted: !!vote,
  };
};
