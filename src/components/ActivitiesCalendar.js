import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../GlobalState";
import ActivityCalendar from "react-activity-calendar";
import ReactTooltip from "react-tooltip";
import "./ActivitiesCalendar.css";

export default function ActivitiesCalendar() {
  const { getActivities, state } = useContext(GlobalContext);
  const [activities, setActivities] = useState([]);

  useEffect(async () => {
    const response = await getActivities("", "", { ordering: "created" });
    setActivities(() => {
      return response.map((activity) => {
        let date = new Date(activity.created);
        return {
          count: parseInt(activity.time_spent / 60 / 60),
          date: date.toISOString().split("T")[0],
          level: activity.time_spent / 3600,
        };
      });
    });
  }, []);

  return (
    <div className="activitiesCalendar">
      <h1 className="activitiesCalendar__title">Activity Calendar</h1>
      <ActivityCalendar
        data={activities}
        blockRadius={7}
        blockSize={14}
        blockMargin={5}
        labels={{
          totalCount: "{{count}} Hours Spent",
        }}
        showWeekdayLabels={true}
      >
        <ReactTooltip html />
      </ActivityCalendar>
    </div>
  );
}
