"use client";

import { FC, ReactNode, useState } from "react";
import { Button } from "../button";
import { MoreVertical } from "lucide-react";
import { motion, PanInfo } from "framer-motion";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "../sheet";

interface ActionMenuProps {
  children: ReactNode;
  header: string;
  description?: string;
  trigger?: ReactNode;
  closeText?: string;
}

export const ActionMenu: FC<ActionMenuProps> = ({
  children,
  header,
  description,
  trigger,
  closeText,
}) => {
  const [open, setOpen] = useState(false);

  const DRAG_CLOSE_THRESHOLD = 50;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > DRAG_CLOSE_THRESHOLD) {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            className="bg-white text-gray-700 hover:bg-white hover:text-gray-700 p-2 h-9 w-9 rounded-md shadow hover:shadow-md transition"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical size={20} />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        side="bottom"
        className="w-full p-0 rounded-t-xl"
      >
        <motion.div
          className="flex justify-center items-center w-full h-12 rounded-full mx-auto cursor-grab"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: "grabbing" }}
        >
          <div className="bg-gray-300 w-40 h-2 rounded-md"></div>
        </motion.div>
        <div className="py-4 px-8 lg:px-36">
          <SheetHeader className="mb-4 text-start">
            <SheetTitle className="text-xl  font-semibold">{header}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          {children}
          <SheetClose asChild>
            <Button variant="outline" className="mt-6 h-12 w-full text-black text-base">
              {closeText ? closeText : "Close"}
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
