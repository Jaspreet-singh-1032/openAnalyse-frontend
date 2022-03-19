import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../GlobalState";
import ActivitiesLogTable from "./ActivitiesLogTable";

// utils import
import { secondsToTimeStamp } from "../utils";

// css import
import "./ActivitiesLog.css";

export default function ActivitiesLog() {
  const { getActivities } = useContext(GlobalContext);
  const [activitiesLog, setActivitiesLog] = useState([]);
  useEffect(async () => {
    const activities = await getActivities();
    setActivitiesLog(() => {
      return activities.map((item, index) => {
        let date = new Date(item.created);
        return {
          id: index + 1,
          activity: item.activity_type,
          timeSpent: secondsToTimeStamp(item.time_spent),
          description: "",
          date: date.toLocaleDateString(),
        };
      });
    });
  }, []);
  return (
    <div className="activitiesLog">
      <h1> Activity Logs</h1>
      <div className="activitiesLog__table">
        <ActivitiesLogTable data={activitiesLog} />
      </div>
    </div>
  );
}
