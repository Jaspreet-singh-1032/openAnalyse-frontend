import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MouseOverPopover from "./MouseOverPopover";
import PropTypes from "prop-types";

// utils import
import { truncateText } from "../utils";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "activity", headerName: "Activity", width: 130 },
  { field: "timeSpent", headerName: "Time Spent", width: 130 },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    renderCell: (param) => {
      return param.value ? (
        <MouseOverPopover
          shortText={truncateText(param.value, 70)}
          fullText={param.value}
        />
      ) : (
        "N/A"
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    width: 160,
  },
];

export default function ActivitiesLogTable({ data }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

ActivitiesLogTable.propTypes = {
  data: PropTypes.array.isRequired,
};
