export interface TripVotePayload {
  tripId: string;
  destinationId: string;
  userId: string;
}

export interface TripVoteResult {
  totalVotes: number;
  hasVoted: boolean;
}
