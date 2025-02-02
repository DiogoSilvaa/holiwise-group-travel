import { CompleteTrip } from "@/app/api/trips/types";
import { SelectedDestinationCard } from "@/components/selected-destination-card/selected-destination-card";
import { useFetchDestinations } from "@/hooks/destination";
import { useUpdateTrip } from "@/hooks/trip";
import { useRemoveTripDestination } from "@/hooks/trip-destination";
import { MapPin } from "lucide-react";
import { FC } from "react";

interface DestinationsTabProps {
  trip: CompleteTrip;
}

export const DestinationsTab: FC<DestinationsTabProps> = ({ trip }) => {
  const { data: dests } = useFetchDestinations(trip.id);
  const { mutate: updateTrip } = useUpdateTrip();
  const { mutate: removeDestination } = useRemoveTripDestination();

  const onSelect = (destinationId: string) => {
    updateTrip({ id: trip.id, destinationId });
  };

  const onDeselect = () => {
    updateTrip({ id: trip.id, destinationId: null });
  };

  const onRemove = (destinationId: string) => {
    removeDestination({ tripId: trip.id, destinationId });
  };

  const selectedDestination =
    trip.selectedDestinationId && dests
      ? dests.find((d) => d.id === trip.selectedDestinationId)
      : null;

  return (
    <div className="flex flex-col space-y-9">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-1">
          <div>
            <MapPin className="stroke-1 fill-primary-500" />
          </div>
          <span>
            <h2 className="text-lg font-semibold">You are going to</h2>
            {!selectedDestination && (
              <p className="text-sm">
                No destination selected yet. Select one of your shortlisted destinations as the
                final one for this trip and it will be pinned here.
              </p>
            )}
          </span>
        </div>
        {selectedDestination && (
          <SelectedDestinationCard
            isSelected
            key={selectedDestination.id}
            destination={selectedDestination}
            onDeselect={onDeselect}
            onRemove={onRemove}
            tripId={trip.id}
          />
        )}
      </div>
      <div className="flex flex-col">
        <span>
          <h3 className="font-semibold">Ideas for destinations</h3>
          <div className="flex flex-col space-y-8 mt-3">
            {dests?.map((d) => {
              if (d.id === selectedDestination?.id) {
                return;
              }

              return (
                <SelectedDestinationCard
                  key={d.id}
                  destination={d}
                  onSelect={onSelect}
                  onRemove={onRemove}
                  tripId={trip.id}
                />
              );
            })}
          </div>
        </span>
      </div>
    </div>
  );
};
