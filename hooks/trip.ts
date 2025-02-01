import { Trip, TripPayload } from "@/app/api/trips/types";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useCreateTrip = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  return useMutation({
    mutationFn: (tripData: TripPayload) =>
      createTrip({ ...tripData, userEmail: userEmail! }),
    mutationKey: ["trips"],
  });
};

export const useFetchTrips = () => {
  return useQuery<Trip[]>({
    queryKey: ["trips"],
    queryFn: async () => {
      const r = await fetch("/api/trips");
      return await r.json();
    },
  });
};
