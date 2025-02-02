"use client";

import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/button";
import { format } from "date-fns";
import { EditTripDialog } from "@/components/trip-dialog/edit-trip-dialog";
import { CompleteTrip } from "@/app/api/trips/types";
import { InviteDialog } from "@/components/invite-dialog/invite-dialog";

export interface TripHeaderProps {
  trip: CompleteTrip;
  isOwner: boolean;
}

export const TripHeader = ({ trip, isOwner }: TripHeaderProps) => {
  const { start, end, name } = trip;
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;
  const formattedDates =
    startDate && endDate
      ? `${format(startDate, "MMM d yyyy")} - ${format(endDate, "MMM d yyyy")}`
      : "Dates have not been decided";

  return (
    <div className="text-center truncate">
      <div className="flex justify-between items-center">
        <Link href="/" passHref>
          <ArrowLeft className="cursor-pointer" />
        </Link>
        {isOwner && <InviteDialog tripId={trip.id} />}
      </div>
      <div className="flex items-center justify-center space-x-2 mt-8">
        <h1 className="text-2xl font-bold">{name}</h1>
        <EditTripDialog trip={trip}>
          <Button variant="outline" className="w-10 h-10">
            <Pencil />
          </Button>
        </EditTripDialog>
      </div>
      <h2 className="mt-3.5 text-gray-800/65">{formattedDates}</h2>
    </div>
  );
};
