import React, { useContext, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { GlobalContext } from "../GlobalState";
import { chartFilters } from "../constants";

import "./chartFilterFrom.css";

function ChartFilterForm() {
  const { updateChartFilter } = useContext(GlobalContext);
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
    updateChartFilter(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="chartFilterFrom">
      <form className="chartFilterFrom__form" onSubmit={submitHandler}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Filter By Days
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filter}
            onChange={handleChange}
            label="Filter"
          >
            {chartFilters.map((filter, index) => {
              return (
                <MenuItem value={filter} key={index}>
                  {filter.text}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* <Button type="submit" variant="contained">
          Filter
        </Button> */}
      </form>
    </div>
  );
}

export default ChartFilterForm;
