import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";

import reducer from "./reducer";
import { getUserApi, userLoginApi, userRegisterApi } from "./api/Auth";
import {
  getActivityTypes,
  postActivityType,
  postAddActivity,
  getActivitiesApi,
  getActivityTypesFetchActivitiesApi,
} from "./api/API";
import {
  setUser,
  setMessage,
  setActivityTypes,
  addActivityTypeAction,
  userLogoutAction,
  setActivities,
  addActivity,
  refreshGraph,
  setFilterByDays,
} from "./actions";

const initialState = {
  user: {},
  message: {},
  activityTypes: [],
  activities: [],
  refreshGraph: false,
  filterByDays: 7,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUser = async () => {
    let response = await getUserApi();
    if (response.status === 200) {
      dispatch(setUser(response.data));
    }
  };

  const userLogin = async (email, password, setOpen = null) => {
    let response = await userLoginApi(email, password);
    if (response.status === 200) {
      dispatch(setUser(response.data.user));
      dispatch(setMessage(response.data.detail, "success"));
      setOpen && setOpen(false);
      fetchActivityTypes();
    } else {
      dispatch(setMessage(response.data.detail, "error"));
    }
  };

  const userRegister = async (email, password, username, setOpen) => {
    let response = await userRegisterApi(email, password, username);
    if (response.status === 201) {
      dispatch(setUser(response.data.user));
      dispatch(setMessage(response.data.detail, "success"));
      setOpen && setOpen(false);
    } else {
      dispatch(
        setMessage(response.data.detail || response.data.email[0], "error")
      );
    }
  };

  const userLogout = () => {
    dispatch(userLogoutAction());
    dispatch(setMessage("Logout successfully", "success"));
    dispatch(setActivityTypes([]));
  };

  const fetchActivityTypes = useCallback(async () => {
    let response = await getActivityTypes();
    if (response.status === 200) {
      dispatch(setActivityTypes(response.data));
    }
  }, []);

  const addActivityType = async (name, setOpen = null) => {
    let response = await postActivityType(name);
    if (response.status === 201) {
      dispatch(addActivityTypeAction(response.data.id, response.data.name));
      dispatch(setMessage("Saved successfully", "success"));
      setOpen && setOpen(false);
    } else {
      dispatch(setMessage(response.data.detail, "error"));
    }
  };
  //
  const saveActivity = async (activityTypeId, timeSpent) => {
    let response = await postAddActivity(activityTypeId, timeSpent);
    if (response.status === 201) {
      dispatch(setMessage("Saved successfully", "success"));
      dispatch(
        addActivity(
          response.data.id,
          response.data.time_spent,
          response.data.activity_type
        )
      );
      dispatch(refreshGraph());
    } else {
      dispatch(setMessage(response.data.detail, "error"));
    }
  };

  const getActivities = useCallback(
    async (created_gte = "", created_lte = "") => {
      let response = await getActivitiesApi(created_gte, created_lte);
      if (response.status === 200) {
        dispatch(setActivities(response.data));
      }
    },
    []
  );

  const fetchActivityTypeActivities = useCallback(async () => {
    let response = await getActivityTypesFetchActivitiesApi();
    return response.data;
  }, []);

  const filterByDays = (days = 7) => {
    console.log("==============", days);
    dispatch(setFilterByDays(days));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        userLogin,
        userRegister,
        userLogout,
        fetchActivityTypes,
        addActivityType,
        saveActivity,
        getActivities,
        fetchActivityTypeActivities,
        filterByDays,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
