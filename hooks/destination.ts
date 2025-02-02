import { Destination } from "@/app/api/destinations/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchDestinations = (tripId?: string) => {
  return useQuery<Destination[]>({
    queryKey: tripId ? ["destinations", tripId] : ["destinations"],
    queryFn: async () => {
      const url = `/api/destinations${tripId ? `?tripId=${tripId}` : ""}`;
      const r = await fetch(url);
      return await r.json();
    },
  });
};
