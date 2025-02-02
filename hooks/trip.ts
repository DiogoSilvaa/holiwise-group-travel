import { CompleteTrip, Trip, TripPayload } from "@/app/api/trips/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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
    onError: (_, patchData, context) => {
      if (context?.previousTrip) {
        queryClient.setQueryData(["trip", patchData.id], context.previousTrip);
      }
    },
    onSettled: (data, err, patchData) => {
      queryClient.invalidateQueries({ queryKey: ["trip", patchData.id] });
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

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
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};
