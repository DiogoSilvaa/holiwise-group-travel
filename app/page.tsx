"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { DndContext } from "@dnd-kit/core";
import { useFetchDestinations } from "@/hooks/destination";
import { CreateTripDialog } from "@/components/trip-dialog/create-trip-dialog";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";
import { TypeSelect } from "@/components/type-select/type-select";
import { useTripManagement } from "@/hooks/use-trip-management";
import { useDragAndDrop } from "@/hooks/use-drag-drop";
import { DESTINATION_FILTER_OPTIONS, TRIP_FILTER_OPTIONS } from "./filters";
import { TripsSection } from "./trips-section";
import { DestinationsSection } from "./destinations-section";
import { useSession } from "next-auth/react";
import { UserItem } from "@/components/navbar/user-item";

const Home: FC = () => {
  const { status } = useSession();
  const router = useRouter();
  const [typeFilter, setTypeFilter] = useState("all");
  const [tripStatusFilter, setTripStatusFilter] = useState("all");

  const { data: destinations } = useFetchDestinations();
  const { trips, addToTrip, removeFromTrip } = useTripManagement();
  const { sensors, draggingId, ...dragHandlers } = useDragAndDrop((tripId, destinationId) => {
    const trip = trips?.find((t) => t.id === tripId);
    console.log(tripId);
    if (trip && !trip.destinationIds.includes(destinationId)) {
      addToTrip({ tripId, destinationId });
    }
  });

  if (status === "unauthenticated")
    return (
      <div className="flex flex-col items-center justify-center w-full text-center mt-24 xl:mt-0 xl:h-screen px-20">
        <h1 className="text-xl font-semibold">Welcome to Holiwise!</h1>
        <h2 className="text-lg mb-10">Sign in to continue</h2>
        <UserItem />
      </div>
    );

  if (!destinations || !trips) return null;

  const filteredTrips =
    tripStatusFilter === "all" ? trips : trips.filter((t) => t.status === tripStatusFilter);

  const filteredDestinations =
    typeFilter === "all" ? destinations : destinations.filter((d) => d.type === typeFilter);

  return (
    <DndContext {...dragHandlers} sensors={sensors}>
      <div className="container max-h-full overflow-y-hidden px-6 lg:px-28 flex flex-col space-y-12 pb-10 lg:pb-28 xl:pt-16">
        <header className="text-center">
          <h1 className="text-4xl font-bold">My trips</h1>
          <h2 className="mt-3.5 text-gray-800/65">
            Organise all your travel planning in one place
          </h2>
        </header>

        <section>
          <div className="flex space-x-4 items-center mb-2">
            <h3 className="font-bold text-2xl">My trips</h3>
            <CreateTripDialog destinations={destinations}>
              <Button variant="outline" className="h-10 w-24 bg-gray-50 rounded-md">
                <Plus />
                <span>Create</span>
              </Button>
            </CreateTripDialog>
          </div>
          <div className="w-fit h-12">
            <TypeSelect
              defaultOption={TRIP_FILTER_OPTIONS[0]}
              options={TRIP_FILTER_OPTIONS.slice(1)}
              setType={setTripStatusFilter}
            />
          </div>
          {filteredTrips.length ? (
            <TripsSection
              trips={filteredTrips}
              draggingId={draggingId}
              onTripClick={(id: string) => router.push(`/trip/${id}`)}
            />
          ) : (
            <EmptyState
              message={
                tripStatusFilter === "all"
                  ? "You have no trips. Create one above."
                  : "No trips match the current filter."
              }
            />
          )}
        </section>
        <section>
          <h3 className="font-bold text-2xl mb-2">My destinations</h3>
          <div className="w-fit h-12">
            <TypeSelect
              defaultOption={DESTINATION_FILTER_OPTIONS[0]}
              options={DESTINATION_FILTER_OPTIONS.slice(1)}
              setType={setTypeFilter}
            />
          </div>
          {filteredDestinations.length ? (
            <DestinationsSection
              destinations={filteredDestinations}
              trips={trips}
              onAddDestination={(tripId, destinationId) => addToTrip({ tripId, destinationId })}
              onRemoveDestination={(tripId, destinationId) =>
                removeFromTrip({ tripId, destinationId })
              }
            />
          ) : (
            <EmptyState message="No destinations match the current filter." />
          )}
        </section>
      </div>
    </DndContext>
  );
};

const EmptyState: FC<{ message: string }> = ({ message }) => (
  <div className="flex w-full text-gray-500 justify-center items-center h-32">{message}</div>
);

export default Home;
