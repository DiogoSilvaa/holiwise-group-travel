import { CompleteTrip } from "@/app/api/trips/[tripId]/types";
import { Trip, TripPayload } from "@/app/api/trips/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const createTrip = async (tripData: TripPayload) => {
  console.log("createTrip", tripData);
  const res = await fetch("/api/trips", {
    method: "POST",
    body: JSON.stringify(tripData),
  });

  if (!res.ok) {
    throw new Error("Failed to create trip");
  }

  return res.json();
};

export const useFetchTrips = () => {
  const { data: session, status } = useSession();

  return useQuery<Trip[]>({
    queryKey: ["trips"],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      const res = await fetch(`/api/trips?userId=${session.user.id}`);
      return await res.json();
    },
    enabled: status !== "loading" && !!session?.user?.id,
  });
};

export const useCreateTrip = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tripData: TripPayload) => {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }
      return await createTrip({ ...tripData, userId: session.user.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};

export const useFetchTrip = (tripId: string) => {
  const { data: session, status } = useSession();

  return useQuery<CompleteTrip>({
    queryKey: ["trip", tripId],
    queryFn: async () => {
      if (!session?.user?.id) throw new Error("User not authenticated");
      const res = await fetch(`/api/trips/${tripId}?userId=${session.user.id}`);
      console.log("hellO?", res);
      if (!res.ok) {
        throw new Error("Failed to fetch trip");
      }
      return await res.json();
    },
    enabled: status !== "loading" && !!session?.user?.id && Boolean(tripId),
  });
};
