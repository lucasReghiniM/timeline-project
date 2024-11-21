import React, { useState } from "react";

import classNames from "classnames";

import { TimelineEvent } from "../../../shared/types/timeline";
import AddEventModal from "./AddEventModal";

interface TimelineBodyProps {
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    timelineEvent: TimelineEvent
  ) => void;
  allowDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDropOnBody: (event: React.DragEvent<HTMLDivElement>) => void;
  lanes: TimelineEvent[][];
  startDate: Date;
  setEvents: React.Dispatch<React.SetStateAction<TimelineEvent[]>>;
  daysRange: Date[];
  addEvent: (name: string, start: string, end: string) => void;
}

const TimelineBody: React.FC<TimelineBodyProps> = ({
  handleDragStart,
  allowDrop,
  handleDropOnBody,
  lanes,
  startDate,
  setEvents,
  daysRange,
  addEvent
}) => {
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDoubleClick = (eventId: number, currentName: string) => {
    setEditingEventId(eventId);
    setEditedName(currentName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const saveEditedName = () => {
    if (editingEventId !== null) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editingEventId
            ? {
                ...event,
                name: editedName
              }
            : event
        )
      );
      setEditingEventId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveEditedName();
    }
  };

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const boundingRect = e.currentTarget.getBoundingClientRect();

    const columnWidth = boundingRect.width / daysRange.length;
    const rowHeight = boundingRect.height / lanes.length;

    const mouseX = e.clientX - boundingRect.left;
    const mouseY = e.clientY - boundingRect.top;

    const targetColumn = Math.floor(mouseX / columnWidth);
    const targetLaneIndex = Math.floor(mouseY / rowHeight);

    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + targetColumn);

    const laneEvents = lanes[targetLaneIndex] || [];

    const hasEvent = laneEvents.some(
      (event) =>
        new Date(event.start) <= targetDate && new Date(event.end) >= targetDate
    );

    if (!hasEvent) {
      setIsModalOpen(true);
    } else {
      console.log(
        `Event found on lane ${targetLaneIndex} and date: ${targetDate.toISOString().split("T")[0]}`
      );
    }
  };

  return (
    <div className="timeline-body-wrapper">
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addEvent}
      />
      <div className="timeline-grid-background"></div>
      <div
        className="timeline-body"
        onDragOver={allowDrop}
        onDrop={handleDropOnBody}
        onClick={handleGridClick}
      >
        {lanes &&
          lanes.map((lane, laneIndex) =>
            lane.map((event) => {
              const startOffset =
                (new Date(event.start).getTime() - startDate.getTime()) /
                (1000 * 60 * 60 * 24);
              const duration =
                (new Date(event.end).getTime() -
                  new Date(event.start).getTime()) /
                  (1000 * 60 * 60 * 24) +
                1;

              return (
                <div
                  key={event.id}
                  className={classNames(
                    "timeline-event",
                    `lane-${(laneIndex % 7) + 1}`
                  )}
                  style={{
                    gridColumn: `${startOffset + 1} / span ${duration}`,
                    gridRow: `${laneIndex + 1}`
                  }}
                  title={event.name}
                  draggable
                  onDragStart={(e) => handleDragStart(e, event)}
                  onDoubleClick={() => handleDoubleClick(event.id, event.name)}
                  onKeyDown={handleKeyDown}
                >
                  {editingEventId === event.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={handleNameChange}
                      onBlur={saveEditedName}
                      autoFocus
                      className="timeline-event-edit-input"
                    />
                  ) : (
                    <span className="timeline-event-name">{event.name}</span>
                  )}
                </div>
              );
            })
          )}
      </div>
    </div>
  );
};

export default TimelineBody;
