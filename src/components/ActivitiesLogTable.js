import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "activity", headerName: "Activity", width: 130 },
  { field: "timeSpent", headerName: "Time Spent", width: 130 },
  {
    field: "description",
    headerName: "Description",
    width: 130,
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
