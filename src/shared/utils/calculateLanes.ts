import { Lanes, TimelineEvent } from "../types/timeline";

export const calculateLanes = (events: TimelineEvent[]): Lanes => {
  const lanes: Lanes = [];
  events.forEach((event) => {
    const lane = lanes.find((lane) =>
      lane.every(
        (e) =>
          new Date(e.end).getTime() < new Date(event.start).getTime() ||
          new Date(e.start).getTime() > new Date(event.end).getTime()
      )
    );
    if (lane) {
      lane.push(event);
    } else {
      lanes.push([event]);
    }
  });
  return lanes;
};
