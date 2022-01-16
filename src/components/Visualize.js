import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../GlobalState";
import PieChart from "../charts/PieChart";
import ChartFilterForm from "./ChartFilterForm";

// css import
import "./Visualize.css";

function Visualize() {
  const { fetchActivityTypeActivities, state } = useContext(GlobalContext);
  const [chartData, setchartData] = useState({});

  useEffect(async () => {
    let response = await fetchActivityTypeActivities(state.chartFilter.days);
    if (!response.detail) {
      response = response.filter((item) => item.total_time_spent !== "0");
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
      <center>
        <ChartFilterForm />
        <div className="visualize__pieChart"></div>
        {chartData.labels && chartData.labels.length > 0 ? (
          <>
            <PieChart
              chartData={chartData}
              chartTitle={`Time invested ${state.chartFilter.text}`}
            />
          </>
        ) : (
          <h3>No activities for {state.chartFilter.text}</h3>
        )}
      </center>
    </div>
  );
}

export default Visualize;
