import React from "react";

import { TimelineEvent } from "../../../shared/types/timeline";
import { calculateLanes } from "../../../shared/utils/calculateLanes";
import "./Timeline.scss";

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const sortedEvents = events.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const lanes = calculateLanes(sortedEvents);

  const startDate = new Date(
    Math.min(...sortedEvents.map((event) => new Date(event.start).getTime()))
  );
  const endDate = new Date(
    Math.max(...sortedEvents.map((event) => new Date(event.end).getTime()))
  );

  const timezoneOffset = new Date().getTimezoneOffset() * 60000; //normalize UTC
  const daysRange: Date[] = [];
  for (
    let d = new Date(startDate.getTime() + timezoneOffset);
    d.getTime() <= endDate.getTime() + timezoneOffset;
    d.setDate(d.getDate() + 1)
  ) {
    daysRange.push(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
  }

  return (
    <div className="timeline">
      <div className="timeline-header">
        {daysRange.map((day, index) => (
          <div key={index} className="timeline-header-cell">
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

      <div className="timeline-body">
        {lanes.map((lane, laneIndex) =>
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
                className="timeline-event"
                style={{
                  gridColumn: `${startOffset + 1} / span ${duration}`,
                  gridRow: `${laneIndex + 1}`
                }}
                title={event.name}
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
