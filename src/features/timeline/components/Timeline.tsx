import React from "react";

import { TimelineEvent } from "../../../shared/types/timeline";
import "./Timeline.scss";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useTimeline } from "../hooks/useTimeline";
import TimelineBody from "./TimelineBody";

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events: initialEvents }) => {
  const { lanes, daysRange, startDate, addEvent, setEvents } =
    useTimeline(initialEvents);

  const { handleDragStart, allowDrop, handleDropOnBody } = useDragAndDrop({
    daysRange,
    setEvents
  });

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
      <TimelineBody
        handleDragStart={handleDragStart}
        allowDrop={allowDrop}
        handleDropOnBody={handleDropOnBody}
        lanes={lanes}
        startDate={startDate}
        setEvents={setEvents}
      />
      <div>
        <ul>
          <li>Gantt Timeline</li>
          <li>Add event</li>
          <li>Drag and drop</li>
          <li>Edit event name on double click</li>
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
