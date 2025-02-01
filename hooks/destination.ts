import { Destination } from "@/app/api/destinations/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchDestinations = () => {
  return useQuery<Destination[]>({
    queryKey: ["destinations"],
    queryFn: async () => {
      const r = await fetch("/api/destinations");
      return await r.json();
    },
  });
};
