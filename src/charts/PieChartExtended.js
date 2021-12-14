import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

function PieChartExtended({ data, dataKey, nameKey }) {
  data = data.map((item) => {
    if (item[dataKey]) {
      return { ...item, [dataKey]: parseInt(item[dataKey]) };
    }
  });
  return (
    <div>
      <PieChart width={730} height={250}>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          fill="#8884d8"
          outerRadius={100}
          label={(entry) => `${entry[nameKey]} - ${entry[dataKey]} hrs`}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={"#" + Math.random().toString(16).substr(-6)}
            />
          ))}
        </Pie>
        {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default PieChartExtended;
