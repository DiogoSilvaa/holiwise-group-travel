import { FC } from "react";
import { Button } from "../button";
import { ActionMenu } from "../action-menu/action-menu";
import { Check, Plus } from "lucide-react";
import { Trip } from "@/app/api/trips/types";
import classNames from "classnames";

interface DestinationCardMenuProps {
  id: string;
  onAddToTrip: (tripId: string, destinationId: string) => void;
  trips: Trip[];
}

export const DestinationCardMenu: FC<DestinationCardMenuProps> = ({
  id,
  trips,
  onAddToTrip,
}) => {
  return (
    <ActionMenu
      header="Lisbon, Portugal"
      description="Add this destination to your trips"
    >
      <div className="flex flex-col space-y-3 max-h-48 overflow-y-auto no-scrollbar">
        {trips.map((t) => {
          const isAlreadyInTrip = t.destinationIds.includes(id);
          return (
            <div key={t.id} className="flex items-stretch space-x-3">
              <div className="bg-gray-200 rounded-md flex items-center flex-1 pl-4">
                <span>{t.name}</span>
              </div>
              {isAlreadyInTrip ? (
                <Button
                  variant="outline"
                  className="flex justify-start text-base h-10 py-2 px-4 bg-primary-500"
                  onClick={() => onAddToTrip(t.id, id)}
                >
                  <Check className="stroke-[2.5px]" />
                  Added
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex justify-start text-base h-10 py-2 px-4 bg-white"
                  onClick={() => onAddToTrip(t.id, id)}
                >
                  <Plus className="stroke-[2.5px]" />
                  Add
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </ActionMenu>
  );
};
