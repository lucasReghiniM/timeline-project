import { useState, DragEvent } from "react";

import { TimelineEvent } from "../../../shared/types/timeline";

interface UseDragAndDropProps {
  daysRange: Date[];
  setEvents: React.Dispatch<React.SetStateAction<TimelineEvent[]>>;
}

export const useDragAndDrop = ({
  daysRange,
  setEvents
}: UseDragAndDropProps) => {
  const [draggedEvent, setDraggedEvent] = useState<TimelineEvent | null>(null);

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    event: TimelineEvent
  ) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = "move";
  };

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropOnBody = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedEvent) return;

    const boundingRect = (
      e.currentTarget as HTMLElement
    ).getBoundingClientRect();

    const columnWidth = boundingRect.width / daysRange.length;
    const mouseX = e.clientX - boundingRect.left;
    const targetColumn = Math.floor(mouseX / columnWidth);

    const targetDate = daysRange[targetColumn];
    if (!targetDate) return;

    const duration =
      (new Date(draggedEvent.end).getTime() -
        new Date(draggedEvent.start).getTime()) /
      (1000 * 60 * 60 * 24);

    const updatedStart = targetDate;
    const updatedEnd = new Date(targetDate);
    updatedEnd.setDate(updatedEnd.getDate() + duration);

    setEvents((prevEvents) => {
      const updated = prevEvents.map((event) =>
        event.id === draggedEvent.id
          ? {
              ...event,
              start: updatedStart.toISOString().split("T")[0],
              end: updatedEnd.toISOString().split("T")[0]
            }
          : event
      );
      console.log("Updated Events:", updated);
      return updated;
    });

    setDraggedEvent(null);
  };

  return { handleDragStart, allowDrop, handleDropOnBody };
};
