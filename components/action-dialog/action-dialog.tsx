"use client";

import { FC, ReactNode } from "react";
import { Button } from "../button";
import { MoreVertical } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../dialog";

interface ActionDialogProps {
  children: ReactNode;
  header: string;
  description?: string;
  trigger?: ReactNode;
  closeText?: string;
}

export const ActionDialog: FC<ActionDialogProps> = ({
  children,
  header,
  description,
  trigger,
  closeText,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            className="bg-white text-gray-700 p-2 h-9 w-9 rounded-md shadow hover:shadow-md transition"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical size={20} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-full p-0 rounded-t-xl">
        <div className="py-4 px-8 flex flex-col space-y-2">
          <DialogHeader className="mb-4 font-semibold text-start">
            <DialogTitle className="text-xl">{header}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogClose asChild>
            <Button
              variant="outline"
              className="h-12 w-full text-black text-base"
              style={{ marginTop: "25px" }}
            >
              {closeText ? closeText : "Close"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
