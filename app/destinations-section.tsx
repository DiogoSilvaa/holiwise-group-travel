import { FC } from "react";
import { DraggableItem } from "@/components/draggable-item/draggable-item";
import { Card } from "@/components/card/card";
import { DestinationCardMenu } from "@/components/card/destination-menu";
import { Trip } from "./api/trips/types";
import { Destination } from "./api/destinations/types";

interface DestinationsSectionProps {
  destinations: Destination[];
  trips: Trip[];
  onAddDestination: (tripId: string, destinationId: string) => void;
  onRemoveDestination: (tripId: string, destinationId: string) => void;
}

export const DestinationsSection: FC<DestinationsSectionProps> = ({
  destinations,
  trips,
  onAddDestination,
  onRemoveDestination,
}) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 lg:gap-x-8 gap-y-8 mt-4">
    {destinations.map((destination) => (
      <DraggableItem id={destination.id} key={destination.id}>
        <Card
          name={destination.name}
          image_urls={[destination.image_url]}
          menu={
            <DestinationCardMenu
              id={destination.id}
              name={destination.name}
              onAddToTrip={onAddDestination}
              onRemoveFromTrip={onRemoveDestination}
              trips={trips}
            />
          }
        />
      </DraggableItem>
    ))}
  </div>
);
