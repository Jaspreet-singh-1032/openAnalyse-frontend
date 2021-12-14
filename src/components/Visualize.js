import React, { useContext, useEffect, useState } from "react";

import PieChartExtended from "../charts/PieChartExtended";
import { GlobalContext } from "../GlobalState";

// css import
import "./Visualize.css";

const data01 = [
  {
    name: "Python",
    value: 400,
  },
  {
    name: "React",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

function Visualize() {
  const { fetchActivityTypeActivities } = useContext(GlobalContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await fetchActivityTypeActivities();
      setData(response);
    }
    fetchData();
  }, [fetchActivityTypeActivities]);
  return (
    <div className="visualize">
      <center>
        <div className="visualize__chartsArea">
          {data.length > 0 && (
            <PieChartExtended
              data={data}
              nameKey={"name"}
              dataKey={"total_time_spent"}
            />
          )}
        </div>
      </center>
    </div>
  );
}

export default Visualize;
