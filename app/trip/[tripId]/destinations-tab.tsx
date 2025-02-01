import { SelectedDestinationCard } from "@/components/selected-destination-card/selected-destination-card";
import { useFetchDestinations } from "@/hooks/destination";
import { MapPin } from "lucide-react";
import { FC } from "react";

export const DestinationsTab: FC = () => {
  const { data: dests } = useFetchDestinations();
  return (
    <div className="flex flex-col space-y-9">
      <div className="flex space-x-1">
        <div className="w-1/4">
          <MapPin className="stroke-1 fill-primary-500" />
        </div>
        <span>
          <h2 className="text-lg font-semibold">You are going to</h2>
          <p className="text-sm">
            No destination selected yet. Select one of your shortlisted
            destinations as the final one for this trip and it will be pinned
            here.
          </p>
        </span>
      </div>
      <div className="flex flex-col">
        <span>
          <h3 className="font-semibold">Ideas for destinations</h3>
          <div className="flex flex-col space-y-8 mt-3">
            {dests?.map((d) => (
              <SelectedDestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </span>
      </div>
    </div>
  );
};
