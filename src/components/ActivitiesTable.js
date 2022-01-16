import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";

const columns = [
  { field: "id", headerName: "ID", width: 70, flex: 0 },
  { field: "activity", headerName: "Activity", width: 130, flex: 2 },
  { field: "totalTime", headerName: "Total", width: 130, flex: 1 },
  {
    field: "average",
    headerName: "Average",
    width: 150,
    flex: 1,
  },
];

function ActivitiesTable({ data }) {
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

ActivitiesTable.propTypes = {
  data: PropTypes.object,
};
export default ActivitiesTable;
