import { useState, useEffect, useMemo, useCallback } from "react";

import { TimelineEvent, Lanes } from "../../../shared/types/timeline";
import { calculateLanes } from "../../../shared/utils/calculateLanes";

interface UseTimelineReturn {
  lanes: TimelineEvent[][];
  daysRange: Date[];
  startDate: Date;
  endDate: Date;
  addEvent: (name: string, start: string, end: string) => void;
  setEvents: React.Dispatch<React.SetStateAction<TimelineEvent[]>>;
}

export const useTimeline = (
  initialEvents: TimelineEvent[]
): UseTimelineReturn => {
  const [events, setEvents] = useState<TimelineEvent[]>(initialEvents);
  const [lanes, setLanes] = useState<Lanes>([]);
  const [daysRange, setDaysRange] = useState<Date[]>([]);

  const { startDate, endDate } = useMemo(() => {
    if (!events.length) {
      const now = new Date();
      return { startDate: now, endDate: now };
    }

    const startDate = new Date(
      Math.min(...events.map((event) => new Date(event.start).getTime()))
    );
    const endDate = new Date(
      Math.max(...events.map((event) => new Date(event.end).getTime()))
    );

    return { startDate, endDate };
  }, [events]);

  useEffect(() => {
    const newLanes = calculateLanes(events);
    setLanes(newLanes);
  }, [events]);

  useEffect(() => {
    if (events.length === 0) return;

    const timezoneOffset = new Date().getTimezoneOffset() * 60000; // Normalize UTC
    const range: Date[] = [];
    for (
      let d = new Date(startDate.getTime() + timezoneOffset);
      d.getTime() <= endDate.getTime() + timezoneOffset;
      d.setDate(d.getDate() + 1)
    ) {
      range.push(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
    }

    setDaysRange(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const addEvent = useCallback(
    (name: string, start: string, end: string) => {
      const newEvent: TimelineEvent = {
        id: events.length + 1, // using length so far
        name,
        start,
        end
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    },
    [events]
  );

  return {
    lanes,
    daysRange,
    startDate,
    endDate,
    addEvent,
    setEvents
  };
};
