import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TripAccessPayload,
  TripAccessResult,
  TripAllowedUsers,
} from "@/app/api/trip-access/types";
import { useToast } from "./use-toast";

const addTripAccessApi = async (payload: TripAccessPayload) => {
  const res = await fetch("/api/trip-access", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add trip access");
  return res.json() as Promise<TripAccessResult>;
};

const removeTripAccessApi = async (payload: TripAccessPayload) => {
  const res = await fetch("/api/trip-access", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to remove trip access");
  return res.json() as Promise<TripAccessResult>;
};

export const useAddTripAccess = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (payload: TripAccessPayload) => {
      return await addTripAccessApi(payload);
    },
    onSuccess: async (data, payload) => {
      await queryClient.invalidateQueries({
        queryKey: ["tripAccess", payload.tripId],
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add user. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useRemoveTripAccess = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Omit<TripAccessPayload, "userId">) => {
      return await removeTripAccessApi(payload);
    },
    onSuccess: async (data, payload) => {
      await queryClient.invalidateQueries({
        queryKey: ["tripAccess", payload.tripId],
      });
    },
  });
};

export const useFetchTripAccess = (tripId: string) => {
  return useQuery<TripAllowedUsers>({
    queryKey: ["tripAccess", tripId],
    queryFn: async () => {
      if (!tripId) throw new Error("tripId is required");
      const res = await fetch(`/api/trip-access?tripId=${tripId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch allowed users");
      }
      return res.json();
    },
    enabled: !!tripId,
  });
};
