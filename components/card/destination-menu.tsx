import { FC } from "react";
import { Button } from "../button";
import { ActionMenu } from "../action-menu/action-menu";
import { Plus } from "lucide-react";

interface DestinationCardMenuProps {
  onAddToTrip: (id: string) => void;
  trips: AvailableTrips[];
}

interface AvailableTrips {
  id: string;
  name: string;
}

export const DestinationCardMenu: FC<DestinationCardMenuProps> = ({
  trips,
  onAddToTrip,
}) => {
  return (
    <ActionMenu header="Lisbon, Portugal">
      <div className="flex flex-col space-y-3 max-h-48 overflow-y-auto no-scrollbar">
        {trips.map((t) => (
          <div key={t.id} className="flex items-stretch space-x-3">
            <div className="bg-gray-200 rounded-md flex items-center flex-1 pl-4">
              <span>{t.name}</span>
            </div>
            <Button
              variant="secondary"
              className="flex justify-start text-base h-10 py-2 px-4 bg-primary-500"
            >
              <Plus className="stroke-[2.5px]" />
              Add
            </Button>
          </div>
        ))}
      </div>
    </ActionMenu>
  );
};
