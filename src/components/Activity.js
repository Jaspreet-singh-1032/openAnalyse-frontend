import React, { useState } from "react";

// css import
import "./Activity.css";

// material ui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Activity() {
  const [activity, setActivity] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);

  const [todayActivities, setTodayActivities] = useState([
    {
      id: 1,
      name: "python",
      timeSpent: 1,
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(activity);
    console.log(timeSpent);
  };

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  return (
    <div className="activity">
      <form className="activity__form" onSubmit={handleSubmit}>
        <FormControl sx={{ minWidth: 120 }} variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            Activity
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={activity}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value={10}>python</MenuItem>
            <MenuItem value={20}>react</MenuItem>
            <MenuItem value={30}>blogs read</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="timeSpent"
          type="time"
          value={timeSpent}
          variant="filled"
          helperText="Select time spent"
          onChange={(e) => setTimeSpent(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>

      <div className="activity__todayActivities">
        <h3>Today's Activities</h3>
      </div>
    </div>
  );
}

export default Activity;
