import React from "react";

import Timeline from "./features/timeline/components/Timeline";
import timelineItems from "./shared/constants/mockTimelineData";

const App: React.FC = () => {
  return (
    <div>
      <Timeline events={timelineItems} />
    </div>
  );
};

export default App;
