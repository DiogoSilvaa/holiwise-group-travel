import { FC, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableItemProps {
  id: string;
  children: ReactNode;
}

export const DroppableItem: FC<DroppableItemProps> = ({ children, id }) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  return <div ref={setNodeRef}>{children}</div>;
};
