"use client";

import { FC } from "react";
import { Button } from "../button";
import { Pin, PinOff, Trash } from "lucide-react";
import { ActionMenu } from "../action-menu/action-menu";
import { Destination } from "@/app/api/destinations/types";

export type TripDestinationMenuProps =
  | {
      destination: Destination;
      isSelected: true;
      onDeselect: (id: string) => void;
      onRemove?: never;
      onSelect?: never;
    }
  | {
      destination: Destination;
      isSelected?: false;
      onSelect: (id: string) => void;
      onRemove: (id: string) => void;
      onDeselect?: never;
    };

export const TripDestinationMenu: FC<TripDestinationMenuProps> = ({
  destination,
  onSelect,
  onDeselect,
  onRemove,
  isSelected,
}) => {
  return (
    <ActionMenu header={destination.name}>
      <div className="flex py-4 flex-col space-y-3">
        {isSelected ? (
          <>
            <Button
              variant="secondary"
              className="w-full flex justify-start text-base h-10 py-2 px-4"
              onClick={() => onDeselect(destination.id)}
            >
              <PinOff />
              Unselect as destination
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              className="w-full flex justify-start text-base h-10 py-2 px-4"
              onClick={() => onSelect(destination.id)}
            >
              <Pin />
              Select as destination
            </Button>
            <Button
              variant="secondary"
              className="w-full flex justify-start text-base h-10 py-2 px-4 text-red-600"
              onClick={() => onRemove(destination.id)}
            >
              <Trash />
              Remove from trip
            </Button>
          </>
        )}
      </div>
    </ActionMenu>
  );
};
