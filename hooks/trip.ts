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

      const r = await fetch(`/api/trips?userId=${session.user.id}`);
      return await r.json();
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
