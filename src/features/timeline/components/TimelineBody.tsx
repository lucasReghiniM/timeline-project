import React, { useState } from "react";

import classNames from "classnames";

import { TimelineEvent } from "../../../shared/types/timeline";

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
}

const TimelineBody: React.FC<TimelineBodyProps> = ({
  handleDragStart,
  allowDrop,
  handleDropOnBody,
  lanes,
  startDate,
  setEvents
}) => {
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");

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

  return (
    <div
      className="timeline-body"
      onDragOver={allowDrop}
      onDrop={handleDropOnBody}
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
  );
};

export default TimelineBody;
