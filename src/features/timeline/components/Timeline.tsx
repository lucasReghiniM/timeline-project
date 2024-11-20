import React, { useState, useEffect } from "react";

import { Lanes, TimelineEvent } from "../../../shared/types/timeline";
import { calculateLanes } from "../../../shared/utils/calculateLanes";
import "./Timeline.scss";

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events: initialEvents }) => {
  const sortedEvents = initialEvents.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const [events, setEvents] = useState<TimelineEvent[]>(sortedEvents);
  const [lanes, setLanes] = useState<Lanes>([]);

  useEffect(() => {
    const newLanes = calculateLanes(events);
    setLanes(newLanes);
  }, [events]);

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

  const addEvent = (name: string, start: string, end: string) => {
    const newEvent: TimelineEvent = {
      id: events.length + 1, // usign length so far
      name,
      start,
      end
    };
    setEvents([...events, newEvent]);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const startInput = form.elements.namedItem("start") as HTMLInputElement;
    const endInput = form.elements.namedItem("end") as HTMLInputElement;

    const name = nameInput.value;
    const start = startInput.value;
    const end = endInput.value;

    addEvent(name, start, end);
    form.reset();
  };

  return (
    <div className="timeline">
      <div className="timeline-form">
        <h3>Add New Event</h3>
        <form onSubmit={handleFormSubmit}>
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
