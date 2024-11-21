import React from "react";

import { TimelineEvent } from "../../../shared/types/timeline";
import "../styles/Timeline.scss";
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
        daysRange={daysRange}
        addEvent={addEvent}
      />
      <div>
        <ul>
          <li>Gantt Timeline</li>
          <li>Add event when click in a empty space</li>
          <li>Drag and drop</li>
          <li>Edit event name on double click</li>
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
