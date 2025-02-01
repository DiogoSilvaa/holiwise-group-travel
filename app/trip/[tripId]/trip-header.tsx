"use client";

import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/button";
import { format } from "date-fns";

export interface TripHeaderProps {
  tripName?: string;
  start?: Date | null | undefined;
  end?: Date | null | undefined;
}

export const TripHeader = ({ tripName, start, end }: TripHeaderProps) => {
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;
  const formattedDates =
    startDate && endDate
      ? `${format(startDate, "MMM d yyyy")} - ${format(endDate, "MMM d yyyy")}`
      : "Dates have not been decided";

  return (
    <div className="text-center truncate">
      <Link href="/" passHref>
        <ArrowLeft className="cursor-pointer" />
      </Link>
      <div className="flex items-center justify-center space-x-2 mt-4">
        <h1 className="text-2xl font-bold">{tripName}</h1>
        <Button variant="outline" className="w-8 h-8">
          <Pencil />
        </Button>
      </div>
      <h2 className="mt-3.5 text-gray-800/65">{formattedDates}</h2>
    </div>
  );
};
