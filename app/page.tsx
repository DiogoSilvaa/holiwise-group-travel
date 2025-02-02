"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { Card } from "@/components/card/card";
import { TypeSelect } from "@/components/type-select/type-select";
import { useState } from "react";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";
import { CreateTripDialog } from "@/components/trip-dialog/create-trip-dialog";
import { useFetchDestinations } from "@/hooks/destination";
import { useFetchTrips } from "@/hooks/trip";
import { DestinationCardMenu } from "@/components/card/destination-menu";
import { useRouter } from "next/navigation";
import { useAddTripDestination, useRemoveTripDestination } from "@/hooks/trip-destination";
import { DroppableItem } from "@/components/droppable-item/droppable-item";
import { DraggableItem } from "@/components/draggable-item/draggable-item";

const destinationTypeOptions = [
  { value: "beach", text: "Beach destinations" },
  { value: "city", text: "City destinations" },
  { value: "ski", text: "Ski destinations" },
];

const tripTypeOptions = [
  { value: "archived", text: "Archived trips" },
  { value: "active", text: "Active trips" },
];

const defaultTripOption = { value: "all", text: "All trips" };

const defaultTypeOption = { value: "all", text: "All destinations" };

const Home = () => {
  const { data: dests } = useFetchDestinations();
  const { data: trips } = useFetchTrips();
  const { mutate: addToTrip } = useAddTripDestination();
  const { mutate: removeFromTrip } = useRemoveTripDestination();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const router = useRouter();
  const [type, setType] = useState("all");
  const [tripStatus, setTripStatus] = useState("all");
  if (!dests || !trips) {
    return null;
  }

  const destinations = type === "all" ? dests : dests.filter((d) => d.type === type);
  const filteredTrips = tripStatus === "all" ? trips : trips.filter((t) => t.status === tripStatus);
  const onAddDestination = (tripId: string, destinationId: string) => {
    return addToTrip({ tripId, destinationId });
  };

  const onRemoveDestination = (tripId: string, destinationId: string) => {
    return removeFromTrip({ tripId, destinationId });
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { over: trip, active: destination } = event;
    setDraggingId(null);
    if (trip && destination) {
      const fullTrip = trips.find((t) => t.id === trip.id);
      const canDrop = !fullTrip?.destinationIds.includes(String(destination?.id));

      if (canDrop) onAddDestination(String(trip.id), String(destination.id));
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={(e) => setDraggingId(String(e.active.id))}
      onDragCancel={() => setDraggingId(null)}
    >
      <div className="container max-h-full overflow-y-hidden px-6 lg:px-28 flex flex-col space-y-12 pb-10 lg:pb-28 xl:pt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold">My trips</h1>
          <h2 className="mt-3.5 text-gray-800/65">
            Organise all your travel planning in one place
          </h2>
        </div>
        <section>
          <div className="flex space-x-4 items-center mb-2">
            <p className="font-bold text-2xl">My trips</p>
            <CreateTripDialog destinations={dests ?? []}>
              <Button variant="outline" className="h-10 w-24 bg-gray-50 rounded-md">
                <Plus />
                <span>Create</span>
              </Button>
            </CreateTripDialog>
          </div>
          <TypeSelect
            defaultOption={defaultTripOption}
            options={tripTypeOptions}
            setType={setTripStatus}
          />
          {filteredTrips.length ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 lg:gap-x-8 gap-y-8 mt-4">
              {filteredTrips.map(({ id, ownerSrc, name, imageUrls, destinationIds }) => (
                <DroppableItem id={id} key={id}>
                  <Card
                    name={name}
                    image_urls={imageUrls}
                    owner_src={ownerSrc}
                    onClick={() => router.push(`/trip/${id}`)}
                    draggingDestinationId={draggingId}
                    destinationIds={destinationIds}
                  />
                </DroppableItem>
              ))}
            </div>
          ) : (
            <div className="flex w-full text-gray-500 justify-center items-center h-32">
              {tripStatus === "all"
                ? "You have no trips. Create one above."
                : "You have no trips that match the current filter."}
            </div>
          )}
        </section>
        <section>
          <p className="font-bold text-2xl mb-2">My destinations</p>
          <TypeSelect
            defaultOption={defaultTypeOption}
            options={destinationTypeOptions}
            setType={setType}
          />
          {destinations.length ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 lg:gap-x-8 gap-y-8 mt-4">
              {destinations?.map(({ id, name, image_url }) => (
                <DraggableItem id={id} key={id}>
                  <Card
                    name={name}
                    image_urls={[image_url]}
                    menu={
                      <DestinationCardMenu
                        id={id}
                        name={name}
                        onAddToTrip={onAddDestination}
                        onRemoveFromTrip={onRemoveDestination}
                        trips={trips}
                      />
                    }
                  />
                </DraggableItem>
              ))}
            </div>
          ) : (
            <div className="flex w-full text-gray-500 justify-center items-center h-32">
              You have no destinations that match the current filter.
            </div>
          )}
        </section>
      </div>
    </DndContext>
  );
};

export default Home;
