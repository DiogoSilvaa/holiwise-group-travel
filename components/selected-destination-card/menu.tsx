"use client";

import { FC } from "react";
import { Button } from "../button";
import { Pin, Trash } from "lucide-react";
import { SheetClose } from "../sheet";
import { ActionMenu } from "../action-menu/action-menu";

export const TripDestinationMenu: FC = () => {
  return (
    <ActionMenu header="Lisbon, Portugal">
      <div className="flex py-4 flex-col space-y-3">
        <Button
          variant="secondary"
          className="w-full flex justify-start text-base h-10 py-2 px-4"
        >
          <Pin />
          Select as destination
        </Button>
        <Button
          variant="secondary"
          className="w-full flex justify-start text-base h-10 py-2 px-4 text-red-600"
        >
          <Trash />
          Remove from trip
        </Button>
      </div>
    </ActionMenu>
  );
};
