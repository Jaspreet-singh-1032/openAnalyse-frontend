import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../GlobalState";
import PieChart from "../charts/PieChart";

// css import
import "./Visualize.css";

function Visualize() {
  const { fetchActivityTypeActivities, state } = useContext(GlobalContext);
  const [chartData, setchartData] = useState({});

  useEffect(() => {
    async function fetchData() {
      let response = await fetchActivityTypeActivities();
      response = response.filter((item) => item.total_time_spent !== null);
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
    fetchData();
  }, [fetchActivityTypeActivities, state.refreshGraph]);
  return (
    <div className="visualize">
      <center>
        <div className="visualize__pieChart"></div>
        {chartData.labels && (
          <>
            <PieChart
              chartData={chartData}
              chartTitle="Hours invested in last 7 days"
            />
          </>
        )}
      </center>
    </div>
  );
}

export default Visualize;
