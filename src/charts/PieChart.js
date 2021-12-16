import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

import "./PieChart.css";
function PieChart({ chartData, chartTitle }) {
  return (
    <div className="pieChart">
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: chartTitle,
              font: {
                size: 22,
              },
            },
            legend: {
              display: true,
              position: "bottom",
              align: "center",
              labels: {
                usePointStyle: true,
                font: {
                  size: 14,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default PieChart;
