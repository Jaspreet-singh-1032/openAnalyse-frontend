import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../GlobalState";
import ActivityCalendar from "react-activity-calendar";
import ReactTooltip from "react-tooltip";
import "./ActivitiesCalendar.css";

import { secondsToTimeStamp } from "../utils";

const getLevel = (time_spent) => {
  switch (true) {
    case time_spent <= 3600:
      return 1;
    case time_spent <= 3600 * 2:
      return 2;
    case time_spent <= 3600 * 3:
      return 3;
    default:
      return 4;
  }
};

export default function ActivitiesCalendar() {
  const { getTimeSpentEachDay, state } = useContext(GlobalContext);
  const [activities, setActivities] = useState([]);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0); // in seconds

  useEffect(async () => {
    const response = await getTimeSpentEachDay();
    setTotalTimeSpent(() =>
      response.reduce((sum, day) => sum + day.total_time_spent, 0)
    );
    setActivities(() => {
      return response.map((day) => {
        return {
          count: secondsToTimeStamp(day.total_time_spent),
          date: day.created__date,
          level: getLevel(day.total_time_spent),
        };
      });
    });
  }, [state.refreshGraph]);

  return (
    <div className="activitiesCalendar">
      <h1 className="activitiesCalendar__title">Activity Calendar</h1>
      <ActivityCalendar
        data={activities}
        blockRadius={7}
        blockSize={14}
        blockMargin={5}
        labels={{
          totalCount: "Total {{total_time_spent}} Spent".replace(
            "{{total_time_spent}}",
            secondsToTimeStamp(totalTimeSpent)
          ),
        }}
        showWeekdayLabels={true}
      >
        <ReactTooltip html />
      </ActivityCalendar>
    </div>
  );
}
