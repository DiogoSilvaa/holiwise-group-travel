import { FC } from "react";
import { Card } from "@/components/card/card";
import { DroppableItem } from "@/components/droppable-item/droppable-item";
import { Trip } from "./api/trips/types";

interface TripsSectionProps {
  trips: Trip[];
  draggingId: string | null;
  onTripClick: (id: string) => void;
}

export const TripsSection: FC<TripsSectionProps> = ({ trips, draggingId, onTripClick }) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 lg:gap-x-8 gap-y-8 mt-4">
    {trips.map((trip) => (
      <DroppableItem id={trip.id} key={trip.id}>
        <Card
          name={trip.name}
          image_urls={trip.imageUrls}
          owner_src={trip.ownerSrc}
          onClick={() => onTripClick(trip.id)}
          draggingDestinationId={draggingId}
          destinationIds={trip.destinationIds}
        />
      </DroppableItem>
    ))}
  </div>
);
