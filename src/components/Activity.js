import React, { useState, useEffect, useContext } from "react";

// css import
import "./Activity.css";

// material ui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

// components import
import ManageActivityModal from "./ManageActivityModal";
import { GlobalContext } from "../GlobalState";

const renderRow = (props) => {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Python`} />
        <ListItemText secondary={`1 hour`} />
      </ListItemButton>
    </ListItem>
  );
};

function Activity() {
  const { fetchActivityTypes, state, saveActivity } = useContext(GlobalContext);
  const [activity, setActivity] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [openActivityManageModal, setOpenActivityManageModal] = useState(false);
  // const [activityTypes, setActivityTypes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(activity);
    console.log(timeSpent);
    saveActivity(activity, timeSpent);
  };

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  useEffect(() => {
    fetchActivityTypes();
  }, [fetchActivityTypes]);

  return (
    <div className="activity">
      <ManageActivityModal
        open={openActivityManageModal}
        setOpen={setOpenActivityManageModal}
        // setActivityTypes={setActivityTypes}
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
              value={activity}
              onChange={handleChange}
              label="Age"
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
          <TextField
            id="timeSpent"
            type="time"
            value={timeSpent}
            required
            variant="filled"
            helperText="Select time spent"
            onChange={(e) => setTimeSpent(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
        <Button variant="text" onClick={() => setOpenActivityManageModal(true)}>
          Manage Activities
        </Button>
      </div>

      <div className="activity__todayActivities">
        <h3>Today's Activities</h3>
        <Box
          sx={{
            width: "100%",
            height: 200,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <FixedSizeList
            height={200}
            width="100%"
            itemSize={46}
            itemCount={20}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      </div>
    </div>
  );
}

export default Activity;
