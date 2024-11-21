import React from "react";

import Timeline from "../features/timeline/components/Timeline";
import timelineItems from "../shared/constants/mockTimelineData";

const TimelinePage: React.FC = () => {
  return <Timeline events={timelineItems} />;
};

export default TimelinePage;
