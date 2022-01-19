import React, { useState, useEffect, useContext } from "react";

// css import
import "./Activity.css";

// material ui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

// components import
import ManageActivityModal from "./ManageActivityModal";
import TimeDurationInput from "./TimeDurationInput";
import { GlobalContext } from "../GlobalState";

// utils import
import { secondsToTimeStamp } from "../utils";

const renderRow = (props) => {
  const { index, style, data } = props;
  let seconds = data[index].time_spent;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemText primary={data[index].activity_type} />~{" "}
      {secondsToTimeStamp(seconds)}
    </ListItem>
  );
};

function Activity() {
  const { fetchActivityTypes, state, saveActivity, getActivities } =
    useContext(GlobalContext);
  const [activity, setActivity] = useState("");
  const [openActivityManageModal, setOpenActivityManageModal] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  // const [activityTypes, setActivityTypes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let toSeconds = hours * 60 * 60 + minutes * 60;
    saveActivity(activity, toSeconds);
  };

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  useEffect(() => {
    fetchActivityTypes();
    let created_gte = new Date();
    created_gte.setHours(0, 0, 0, 0);
    getActivities(created_gte.toJSON());
  }, [fetchActivityTypes, getActivities]);

  return (
    <div className="activity">
      <ManageActivityModal
        open={openActivityManageModal}
        setOpen={setOpenActivityManageModal}
      />
      <div className="activity__activityManage">
        <form className="activity__form" onSubmit={handleSubmit}>
          <FormControl sx={{ minWidth: 120 }} variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Select Activity
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              required
              value={activity}
              onChange={handleChange}
              label="activity"
            >
              {state.activityTypes.map((item) => {
                return (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    className="activity__selectItem"
                  >
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TimeDurationInput
            hours={hours}
            minutes={minutes}
            setHours={setHours}
            setMinutes={setMinutes}
          />
          <Button type="submit">Submit</Button>
        </form>
        <Button variant="text" onClick={() => setOpenActivityManageModal(true)}>
          Manage Activities
        </Button>
      </div>

      <div className="activity__todayActivities">
        <h3>Today&apos;s Activities</h3>
        {state.activities.length === 0 ? (
          <p>You have no activities for today...</p>
        ) : (
          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "rgb(245 245 245 / 91%)",
            }}
          >
            <FixedSizeList
              height={200}
              width="100%"
              itemSize={46}
              itemCount={state.activities.length}
              overscanCount={5}
              itemData={state.activities}
            >
              {renderRow}
            </FixedSizeList>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Activity;
