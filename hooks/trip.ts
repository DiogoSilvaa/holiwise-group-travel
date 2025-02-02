import { CompleteTrip, Trip, TripPayload } from "@/app/api/trips/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useToast } from "./use-toast";

const createTrip = async (tripData: TripPayload) => {
  const res = await fetch("/api/trips", {
    method: "POST",
    body: JSON.stringify(tripData),
  });

  if (!res.ok) {
    throw new Error("Failed to create trip");
  }

  return res.json();
};

const updateTrip = async ({
  id,
  ...patch
}: Partial<TripPayload> & { id: string }) => {
  const res = await fetch(`/api/trips/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    throw new Error("Failed to update trip");
  }
  return res.json();
};

const deleteTripApi = async (tripId: string) => {
  const res = await fetch(`/api/trips/${tripId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete trip: ${tripId}`);
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
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tripData: TripPayload) => {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }
      return await createTrip({ ...tripData, userId: session.user.id });
    },
    onSuccess: (_, trip) => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      toast({
        title: "Trip Created",
        description: `Your trip "${trip.name}" was successfully created.`,
      });
    },
    onError: (_, trip) => {
      toast({
        variant: "destructive",
        title: "Trip Creation Failed",
        description: `There was a problem creating your trip "${trip.name}". Please try again later.`,
      });
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
      if (!res.ok) {
        throw new Error("Failed to fetch trip");
      }
      return await res.json();
    },
    enabled: status !== "loading" && !!session?.user?.id && !!tripId,
  });
};

export const useUpdateTrip = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (patchData: Partial<TripPayload> & { id: string }) => {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }
      return await updateTrip({ ...patchData, userId: session.user.id });
    },
    onMutate: async (patchData) => {
      await queryClient.cancelQueries({ queryKey: ["trip", patchData.id] });
      const previousTrip = queryClient.getQueryData<CompleteTrip>([
        "trip",
        patchData.id,
      ]);
      queryClient.setQueryData<CompleteTrip>(["trip", patchData.id], (old) => ({
        ...old!,
        ...patchData,
      }));
      return { previousTrip };
    },
    onSuccess: () => {
      toast({
        title: "Trip Updated",
        description: `Your trip was successfully updated.`,
      });
    },
    onError: (_, patchData, context) => {
      if (context?.previousTrip) {
        queryClient.setQueryData(["trip", patchData.id], context.previousTrip);
      }
      toast({
        variant: "destructive",
        title: "Trip Update Failed",
        description: `There was a problem updating your trip. Please try again later.`,
      });
    },
    onSettled: (data, err, patchData) => {
      queryClient.invalidateQueries({ queryKey: ["trip", patchData.id] });
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (tripId: string) => {
      return await deleteTripApi(tripId);
    },
    onMutate: async (tripId: string) => {
      await queryClient.cancelQueries({ queryKey: ["trips"] });
      await queryClient.cancelQueries({ queryKey: ["trip"] });

      const previousTrips = queryClient.getQueryData<Trip[]>(["trips"]);
      queryClient.setQueryData<Trip[]>(["trips"], (oldTrips) =>
        oldTrips ? oldTrips.filter((trip) => trip.id !== tripId) : []
      );
      queryClient.removeQueries({ queryKey: ["trip", tripId] });
      return { previousTrips };
    },
    onError: (err, tripId, context) => {
      if (context?.previousTrips) {
        queryClient.setQueryData<Trip[]>(["trips"], context.previousTrips);
      }
      toast({
        variant: "destructive",
        title: "Trip Deletion Failed",
        description: `There was a problem deleting your trip. Please try again later.`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      toast({
        title: "Trip Deleted",
        description: `Your trip has been successfully deleted.`,
        variant: "default",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};
