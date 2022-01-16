import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../GlobalState";
import PieChart from "../charts/PieChart";
import ChartFilterForm from "./ChartFilterForm";
import ActivitiesTable from "./ActivitiesTable";

// utils import
import { secondsToTimeStamp } from "../utils";

// css import
import "./Visualize.css";

function Visualize() {
  const { fetchActivityTypeActivities, state } = useContext(GlobalContext);
  const [chartData, setchartData] = useState({});
  const [activitiesTableData, setActivitiesTableData] = useState([]);

  useEffect(async () => {
    let response = await fetchActivityTypeActivities(state.chartFilter.days);
    if (!response.detail) {
      response = response.filter((item) => item.total_time_spent !== "0");
      setActivitiesTableData(() => {
        return response.map((item, index) => {
          return {
            id: index + 1,
            activity: item.name,
            totalTime: secondsToTimeStamp(item.total_time_spent),
            average: secondsToTimeStamp(
              state.chartFilter.days > 0
                ? item.total_time_spent / state.chartFilter.days
                : item.total_time_spent
            ),
          };
        });
      });
      setchartData(() => {
        return {
          labels: response.map((item) => item.name),
          datasets: [
            {
              label: "Hours invested",
              data: response.map((item) =>
                parseFloat(item.total_time_spent / 60 / 60).toFixed(1)
              ),
              backgroundColor: response.map(
                () => "#" + Math.random().toString(16).substr(-6)
              ),
            },
          ],
        };
      });
    }
  }, [fetchActivityTypeActivities, state.refreshGraph, state.chartFilter]);
  return (
    <div className="visualize">
      <ChartFilterForm />
      {chartData.labels && chartData.labels.length > 0 ? (
        <div className="visualize__data">
          <PieChart
            chartData={chartData}
            chartTitle={`Time invested ${state.chartFilter.text}`}
          />
          <ActivitiesTable data={activitiesTableData} />
        </div>
      ) : (
        <h3>No activities for {state.chartFilter.text}</h3>
      )}
    </div>
  );
}

export default Visualize;
