import { db } from "@/lib/db";
import { TripVoteResult } from "./types";

export const queryTripVotes = async (
  tripId: string,
  destinationId: string,
  userId: string
): Promise<TripVoteResult> => {
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
