import { TripDestinationPayload } from "@/app/api/trip-destination/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const addTripDestination = async (payload: TripDestinationPayload) => {
  const res = await fetch("/api/trip-destination", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to add trip destination link");
  }
  return res.json();
};

export const useAddTripDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TripDestinationPayload) => {
      return await addTripDestination(payload);
    },
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({ queryKey: ["trips"] });
      await queryClient.invalidateQueries({
        queryKey: ["trip", payload.tripId],
      });
    },
  });
};

const removeTripDestinationApi = async (payload: TripDestinationPayload) => {
  const res = await fetch("/api/trip-destination", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to remove trip destination link");
  }
  return res.json();
};

export const useRemoveTripDestination = (showToast?: boolean) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (payload: TripDestinationPayload) => await removeTripDestinationApi(payload),
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({ queryKey: ["trips"] });
      await queryClient.invalidateQueries({
        queryKey: ["trip", payload.tripId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["destinations", payload.tripId],
      });
      if (showToast) {
        toast({
          title: "Destination removed",
          description: "The destination has been removed with success.",
        });
      }
    },
  });
};
