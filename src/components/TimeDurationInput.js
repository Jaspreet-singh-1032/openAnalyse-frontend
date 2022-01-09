import React from "react";
import PropTypes from "prop-types";

// material ui
import TextField from "@mui/material/TextField";

import "./TimeDurationInput.css";

const valueToSet = (val, min, max) => {
  if (!val) return val;
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
};

function TimeDurationInput({ hours, minutes, setHours, setMinutes }) {
  const minHours = 0;
  const maxHours = 23;
  const minMinutes = 0;
  const maxMinutes = 59;

  const handleChange = (e) => {
    if (e.target.name == "hours") {
      setHours(parseInt(valueToSet(e.target.value, minHours, maxHours)));
    } else {
      setMinutes(parseInt(valueToSet(e.target.value, minMinutes, maxMinutes)));
    }
  };
  return (
    <div className="timeDurationInput">
      <div className="timeDurationInput__inputsContainer">
        <TextField
          className="timeDurationInput__hours"
          type="number"
          id="outlined-basic"
          name="hours"
          label="Hours"
          variant="outlined"
          required
          InputProps={{ inputProps: { min: minHours, max: maxHours } }}
          value={hours}
          onChange={handleChange}
        />
        <TextField
          className="timeDurationInput__minutes"
          type="number"
          id="outlined-basic"
          name="minutes"
          label="Minutes"
          variant="outlined"
          InputProps={{ inputProps: { min: minMinutes, max: maxMinutes } }}
          required
          value={minutes}
          onChange={handleChange}
        />
      </div>
      <p className="timeDurationInput__label">Enter time spent</p>
    </div>
  );
}

TimeDurationInput.propTypes = {
  hours: PropTypes.number,
  minutes: PropTypes.number,
  setHours: PropTypes.func,
  setMinutes: PropTypes.func,
};

export default TimeDurationInput;
