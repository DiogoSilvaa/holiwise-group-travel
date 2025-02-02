import { useFetchTrips } from "./trip";
import { useAddTripDestination, useRemoveTripDestination } from "./trip-destination";

export const useTripManagement = () => {
  const { data: trips, isLoading: isTripsLoading } = useFetchTrips();
  const { mutate: addToTrip } = useAddTripDestination();
  const { mutate: removeFromTrip } = useRemoveTripDestination();

  return {
    trips,
    isTripsLoading,
    addToTrip,
    removeFromTrip,
  };
};
