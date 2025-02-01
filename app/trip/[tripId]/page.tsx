"use client";

import { notFound, useParams } from "next/navigation";
import { TripHeader } from "./trip-header";
import { TripTabs } from "./trip-tabs";
import { useFetchTrip } from "@/hooks/trip";

const TripPage = () => {
  const { tripId } = useParams();

  if (!tripId || typeof tripId !== "string") {
    notFound();
  }

  const { data: trip, status } = useFetchTrip(tripId);

  if (status === "pending" || !trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-6 flex flex-col space-y-8">
      <TripHeader trip={trip} />
      <TripTabs tripId={tripId} />
    </div>
  );
};

export default TripPage;
