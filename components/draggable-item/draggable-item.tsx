import { FC, ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableItemProps {
  id: string;
  children: ReactNode;
}

export const DraggableItem: FC<DraggableItemProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div {...listeners} {...attributes} ref={setNodeRef} style={style} className="z-50">
      {children}
    </div>
  );
};
