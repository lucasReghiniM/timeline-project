import React, { useState } from "react";

import classNames from "classnames";

import { TimelineEvent } from "../../../shared/types/timeline";
import "./Timeline.scss";
import { useTimeline } from "../hooks/useTimeline";

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events: initialEvents }) => {
  const { lanes, daysRange, startDate, addEvent, setEvents } =
    useTimeline(initialEvents);

  const [draggedEvent, setDraggedEvent] = useState<TimelineEvent | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    event: TimelineEvent
  ) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = "move";
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropOnBody = (e: React.DragEvent<HTMLDivElement>) => {
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

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === draggedEvent.id
          ? {
              ...event,
              start: updatedStart.toISOString().split("T")[0],
              end: updatedEnd.toISOString().split("T")[0]
            }
          : event
      )
    );

    setDraggedEvent(null);
  };

  return (
    <div className="timeline">
      <div className="timeline-form">
        <h3>Add New Event</h3>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const nameInput = form.elements.namedItem(
              "name"
            ) as HTMLInputElement;
            const startInput = form.elements.namedItem(
              "start"
            ) as HTMLInputElement;
            const endInput = form.elements.namedItem("end") as HTMLInputElement;

            const name = nameInput.value;
            const start = startInput.value;
            const end = endInput.value;

            addEvent(name, start, end);
            form.reset();
          }}
        >
          <input name="name" placeholder="Event Name" required />
          <input
            name="start"
            type="date"
            min="2021-01-01"
            max="2021-12-31"
            required
          />
          <input
            name="end"
            type="date"
            min="2021-01-01"
            max="2021-12-31"
            required
          />
          <button type="submit">Add Event</button>
        </form>
      </div>

      <div className="timeline-header">
        {daysRange.map((day, index) => (
          <div
            key={index}
            className="timeline-header-cell"
            onDragOver={allowDrop}
          >
            <div className="month">
              {day
                .toLocaleDateString("en-US", { month: "short" })
                .toLowerCase()}
            </div>
            <div className="day">
              {day.toLocaleDateString("en-US", { day: "2-digit" })}
            </div>
          </div>
        ))}
      </div>

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
                >
                  <span className="timeline-event-name">{event.name}</span>
                </div>
              );
            })
          )}
      </div>
    </div>
  );
};

export default Timeline;
