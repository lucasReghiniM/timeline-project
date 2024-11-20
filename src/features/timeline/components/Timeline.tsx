import React from "react";

import { TimelineEvent } from "../../../shared/types/timeline";
import { calculateLanes } from "../../../shared/utils/calculateLanes";
import "./Timeline.scss";

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const lanes = calculateLanes(events);

  const startDate = new Date(
    Math.min(...events.map((event) => new Date(event.start).getTime()))
  );
  const endDate = new Date(
    Math.max(...events.map((event) => new Date(event.end).getTime()))
  );

  const daysRange = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    daysRange.push(new Date(d));
  }

  const minEventWidth = 3;
  const dayWidth = 2;

  return (
    <div className="timeline">
      <div className="timeline-header">
        {Array.from(
          {
            length: Math.ceil(
              (new Date(events[events.length - 1].end).getTime() -
                new Date(events[0].start).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          },
          (_, i) => {
            const day = new Date(
              new Date(events[0].start).getTime() + i * 24 * 60 * 60 * 1000
            );
            return (
              <div key={i} className="timeline-header-day">
                {day.toISOString().split("T")[0]}
              </div>
            );
          }
        )}
      </div>

      {lanes.map((lane, laneIndex) => (
        <div key={laneIndex} className="timeline-lane">
          {lane.map((event) => {
            const startOffset =
              (new Date(event.start).getTime() -
                new Date(events[0].start).getTime()) /
              (1000 * 60 * 60 * 24);

            const eventDuration =
              (new Date(event.end).getTime() -
                new Date(event.start).getTime()) /
              (1000 * 60 * 60 * 24);

            return (
              <div
                key={event.id}
                className="timeline-event"
                style={{
                  left: `${startOffset * dayWidth}rem`,
                  width: `${Math.max(eventDuration * dayWidth, minEventWidth)}rem`
                }}
                title={event.name}
              >
                <span className="timeline-event-name">{event.name}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
