"use client";

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
import { useAddTripDestination } from "@/hooks/trip-destination";

const destinationTypeOptions = [
  { value: "beach", text: "Beach destinations" },
  { value: "city", text: "City destinations" },
  { value: "ski", text: "Ski destinations" },
];

const defaultTypeOption = { value: "all", text: "All destinations" };

const Home = () => {
  const { data: dests } = useFetchDestinations();
  const { data: trips } = useFetchTrips();
  const { mutate: addToTrip } = useAddTripDestination();
  const router = useRouter();
  const [type, setType] = useState("all");
  if (!dests || !trips) {
    return null;
  }

  const destinations = type === "all" ? dests : dests?.filter((d) => d.type === type);

  const onAddDestination = (tripId: string, destinationId: string) => {
    return addToTrip({ tripId, destinationId });
  };

  return (
    <div className="container px-6 lg:px-28 flex flex-col space-y-12 pb-10 lg:pb-28 xl:pt-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold">My trips</h1>
        <h2 className="mt-3.5 text-gray-800/65">Organise all your travel planning in one place</h2>
      </div>
      <section>
        <div className="flex space-x-4 items-center">
          <p className="font-bold text-2xl">My trips</p>
          <CreateTripDialog destinations={dests ?? []}>
            <Button variant="outline" className="h-10 w-24 bg-gray-50 rounded-md">
              <Plus />
              <span>Create</span>
            </Button>
          </CreateTripDialog>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 lg:gap-x-8 gap-y-8 mt-4">
          {trips?.map(({ id, ownerSrc, name, imageUrls }) => (
            <Card
              key={id}
              name={name}
              image_urls={imageUrls}
              owner_src={ownerSrc}
              onClick={() => router.push(`/trip/${id}`)}
            />
          ))}
        </div>
      </section>
      <section>
        <p className="font-bold text-2xl mb-1">My destinations</p>
        <TypeSelect
          defaultOption={defaultTypeOption}
          options={destinationTypeOptions}
          setType={setType}
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 lg:gap-x-8 gap-y-8 mt-4">
          {destinations?.map(({ id, name, image_url }) => (
            <Card
              name={name}
              key={id}
              image_urls={[image_url]}
              menu={
                <DestinationCardMenu
                  id={id}
                  name={name}
                  onAddToTrip={onAddDestination}
                  trips={trips}
                />
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
