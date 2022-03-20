import React, { useState, useEffect, useContext } from "react";

// css import
import "./Activity.css";

// material ui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
  const [activityDescription, setActivityDescription] = useState("");
  const [todayActivities, setTodayActivities] = useState([]);
  const [openActivityManageModal, setOpenActivityManageModal] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const manageActivitesButton = () => {
    return (
      <Button variant="text" onClick={() => setOpenActivityManageModal(true)}>
        Manage Activities
      </Button>
    );
  };
  // const [activityTypes, setActivityTypes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let toSeconds = hours * 60 * 60 + minutes * 60;
    let body = {
      time_spent: toSeconds,
      description: activityDescription,
    };
    saveActivity(activity, body);
  };

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  useEffect(async () => {
    fetchActivityTypes();
    let created_gte = new Date();
    created_gte.setHours(0, 0, 0, 0);
    const activities = await getActivities(created_gte.toJSON());
    setTodayActivities(activities);
  }, [fetchActivityTypes, getActivities, state.refreshGraph]);

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
              {state.activityTypes.length > 0
                ? state.activityTypes.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        className="activity__selectItem"
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })
                : manageActivitesButton()}
            </Select>
          </FormControl>
          <TimeDurationInput
            hours={hours}
            minutes={minutes}
            setHours={setHours}
            setMinutes={setMinutes}
          />
          <TextField
            id="outlined-multiline-static"
            label="Add a description..."
            multiline
            rows={4}
            inputProps={{ maxLength: 500 }}
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
        {manageActivitesButton()}
      </div>

      <div className="activity__todayActivities">
        <h3>Today&apos;s Activities</h3>
        {todayActivities.length === 0 ? (
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
              itemCount={todayActivities.length}
              overscanCount={5}
              itemData={todayActivities}
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
