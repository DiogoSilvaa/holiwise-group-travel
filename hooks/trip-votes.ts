import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TripVotePayload, TripVoteResult } from "@/app/api/trip-votes/types";
import { useSession } from "next-auth/react";

interface UseTripVoteQueryParams {
  tripId: string;
  destinationId: string;
}

const toggleTripVote = async (payload: TripVotePayload) => {
  const res = await fetch("/api/trip-votes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to toggle trip vote");
  }
  return res.json() as Promise<TripVoteResult>;
};

const fetchTripVote = async (
  params: UseTripVoteQueryParams,
  userId: string
) => {
  const res = await fetch(
    `/api/trip-votes?tripId=${params.tripId}&destinationId=${params.destinationId}&userId=${userId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch trip votes");
  }
  return res.json();
};

export const useToggleTripVote = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Omit<TripVotePayload, "userId">) => {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }
      const fullPayload: TripVotePayload = {
        ...payload,
        userId: session.user.id,
      };
      return await toggleTripVote(fullPayload);
    },
    onMutate: async (payload) => {
      // You may cancel queries and snapshot previous vote data.
      const queryKey = [
        "tripVotes",
        payload.tripId,
        payload.destinationId,
        session?.user?.id,
      ];
      await queryClient.cancelQueries({ queryKey });
      const previousVote = queryClient.getQueryData<TripVoteResult>(queryKey);
      if (previousVote) {
        queryClient.setQueryData(queryKey, {
          totalVotes: previousVote.hasVoted
            ? previousVote.totalVotes - 1
            : previousVote.totalVotes + 1,
          hasVoted: !previousVote.hasVoted,
        });
      }
      return { previousVote };
    },
    onError: (err, payload, context) => {
      const queryKey = [
        "tripVotes",
        payload.tripId,
        payload.destinationId,
        session?.user?.id,
      ];
      if (context?.previousVote) {
        queryClient.setQueryData(queryKey, context.previousVote);
      }
    },
    onSettled: (data, err, payload) => {
      const queryKey = [
        "tripVotes",
        payload.tripId,
        payload.destinationId,
        session?.user?.id,
      ];
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useFetchTripVotes = (params: UseTripVoteQueryParams) => {
  const { data: session, status } = useSession();
  const { tripId, destinationId } = params;
  return useQuery<TripVoteResult>({
    queryKey: ["tripVotes", tripId, destinationId, session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }
      return fetchTripVote(params, session?.user?.id);
    },
    enabled: status !== "loading" && !!session?.user?.id,
  });
};
