"use client";

import { notFound, useParams } from "next/navigation";
import { TripHeader } from "./trip-header";
import { TripTabs } from "./trip-tabs";
import { useFetchTrip } from "@/hooks/trip";
import { useSession } from "next-auth/react";

const TripPage = () => {
  const { tripId } = useParams();
  const { data } = useSession();
  if (!tripId || typeof tripId !== "string") {
    notFound();
  }

  const { data: trip, status } = useFetchTrip(tripId);

  if (status === "pending" || !trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-6 flex flex-col space-y-8">
      <TripHeader trip={trip} isOwner={data?.user.email === trip.ownerEmail} />
      <TripTabs trip={trip} />
    </div>
  );
};

export default TripPage;
