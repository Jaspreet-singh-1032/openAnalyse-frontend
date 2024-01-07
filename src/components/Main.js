import React from "react";

import Activity from "./Activity";
import Visualize from "./Visualize";
import ActivitiesLog from "./ActivitiesLog";
import ActivitiesCalendar from "./ActivitiesCalendar";

function Main() {
  return (
    <div>
      <Activity />
      <Visualize />
      <ActivitiesLog />
      <ActivitiesCalendar />
    </div>
  );
}

export default Main;
