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

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-6 flex flex-col space-y-8">
      <TripHeader tripName={trip?.name} start={trip?.start} end={trip?.end} />
      <TripTabs tripId={tripId} />
    </div>
  );
};

export default TripPage;
