import { FC, ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useMediaQuery } from "@react-hookz/web";
import { useXlViewport } from "@/hooks/use-xl-viewport";

interface DraggableItemProps {
  id: string;
  children: ReactNode;
}

export const DraggableItem: FC<DraggableItemProps> = ({ children, id }) => {
  const { isXl } = useXlViewport();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: !isXl,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div {...listeners} {...attributes} ref={setNodeRef} style={style} className="z-10">
      {children}
    </div>
  );
};
