import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GlobalContext } from "../GlobalState";

import "./chartFilterFrom.css";

function ChartFilterForm() {
  const { filterByDays, state } = useContext(GlobalContext);
  const [filter, setFilter] = useState(state.filterByDays);

  const submitHandler = (e) => {
    e.preventDefault();
    filterByDays(filter);
  };
  return (
    <div className="chartFilterFrom">
      <form className="chartFilterFrom__form" onSubmit={submitHandler}>
        <TextField
          id="outlined-number"
          label="Filter by days"
          type="number"
          value={filter}
          onChange={(e) =>
            setFilter(() => {
              return e.target.value > 0 ? e.target.value : 1;
            })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained">
          Filter
        </Button>
      </form>
    </div>
  );
}

export default ChartFilterForm;
