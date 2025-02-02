import { useState } from "react";
import { DragEndEvent, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { activationConstraint } from "@/components/draggable-item/sensor-delay";

export const useDragAndDrop = (
  handleValidDrop: (tripId: string, destinationId: string) => void
) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint }));

  const onDragEnd = (event: DragEndEvent) => {
    const { over: trip, active: destination } = event;
    setDraggingId(null);
    console.log("trip?.id", trip?.id);
    console.log("destination?.id", destination?.id);
    if (trip?.id && destination?.id) {
      handleValidDrop(String(trip.id), String(destination.id));
    }
  };

  return {
    sensors,
    draggingId,
    onDragStart: (e: any) => setDraggingId(String(e.active.id)),
    onDragCancel: () => setDraggingId(null),
    onDragEnd,
  };
};
