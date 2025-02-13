import { FC } from "react";
import { Button } from "../button";
import { ActionMenu } from "../action-menu/action-menu";
import { ActionDialog } from "../action-dialog/action-dialog";
import { Check, Plus } from "lucide-react";
import { Trip } from "@/app/api/trips/types";
import { useXlViewport } from "@/hooks/use-xl-viewport";

interface DestinationCardMenuProps {
  id: string;
  name: string;
  onAddToTrip: (tripId: string, destinationId: string) => void;
  onRemoveFromTrip: (tripId: string, destinationId: string) => void;
  trips: Trip[];
}

export const DestinationCardMenu: FC<DestinationCardMenuProps> = ({
  id,
  trips,
  onAddToTrip,
  onRemoveFromTrip,
  name,
}) => {
  const { isXl } = useXlViewport();
  const Component = isXl ? ActionDialog : ActionMenu;

  return (
    <Component header={name} description="Add this destination to your trips">
      <div className="flex flex-col space-y-3 max-h-48 overflow-y-auto no-scrollbar xl:mb-2">
        {trips.map((t) => {
          const isAlreadyInTrip = t.destinationIds.includes(id);
          return (
            <div key={t.id} className="flex items-stretch space-x-3">
              <div className="bg-gray-200 rounded-md flex items-center flex-1 pl-4">
                <span className="truncate">{t.name}</span>
              </div>
              {isAlreadyInTrip ? (
                <Button
                  variant="outline"
                  className="flex justify-center text-base h-10 w-28 py-2 hover:bg-primary-500 bg-primary-500"
                  onClick={() => onRemoveFromTrip(t.id, id)}
                >
                  <Check className="stroke-[2.5px]" /> Added
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex justify-center text-base h-10 w-28 py-2 hover:bg-white lg:hover:bg-gray-200 bg-white"
                  onClick={() => onAddToTrip(t.id, id)}
                >
                  <Plus className="stroke-[2.5px]" /> Add
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Component>
  );
};
