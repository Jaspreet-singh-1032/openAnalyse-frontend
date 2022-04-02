import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import reducer from "./reducer";
import {
  getUserApi,
  userLoginApi,
  userRegisterApi,
  googleAuthLoginApi,
} from "./api/Auth";
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
  refreshGraph,
  setChartFilter,
  startLoading,
  stopLoading,
} from "./actions";

import { chartFilters } from "./constants";

const initialState = {
  user: null,
  message: {},
  activityTypes: [],
  refreshGraph: false,
  chartFilter: chartFilters[2],
  loading: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUser = async () => {
    dispatch(startLoading());
    let response = await getUserApi();
    if (response.status === 200) {
      dispatch(setUser(response.data));
    }
    dispatch(stopLoading());
  };

  const userLogin = async (email, password, setOpen = null) => {
    dispatch(startLoading());
    let response = await userLoginApi(email, password);
    if (response.status === 200) {
      dispatch(setUser(response.data.user));
      dispatch(setMessage(response.data.detail, "success"));
      setOpen && setOpen(false);
      fetchActivityTypes();
    } else {
      dispatch(setMessage(response.data.detail, "error"));
    }
    dispatch(stopLoading());
  };

  const userGoogleLogin = async (accessToken) => {
    dispatch(startLoading());
    let response = await googleAuthLoginApi(accessToken);
    if (response.status === 200) {
      getUser();
      dispatch(setMessage("login success", "success"));
      fetchActivityTypes();
    } else {
      dispatch(setMessage(response.data.detail, "error"));
    }
    dispatch(stopLoading());
  };

  const userRegister = async (email, password, username, setOpen) => {
    dispatch(startLoading());
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
    dispatch(stopLoading());
  };

  const userLogout = () => {
    dispatch(userLogoutAction());
    dispatch(setMessage("Logout successfully", "success"));
    dispatch(setActivityTypes([]));
  };

  const fetchActivityTypes = useCallback(async () => {
    dispatch(startLoading());
    let response = await getActivityTypes();
    if (response.status === 200) {
      dispatch(setActivityTypes(response.data));
    }
    dispatch(stopLoading());
  }, []);

  const addActivityType = async (name, setOpen = null) => {
    dispatch(startLoading());
    let response = await postActivityType(name);
    if (response.status === 201) {
      dispatch(addActivityTypeAction(response.data.id, response.data.name));
      dispatch(setMessage("Saved successfully", "success"));
      setOpen && setOpen(false);
    } else {
      dispatch(setMessage(response.data.detail, "error"));
    }
    dispatch(stopLoading());
  };
  //
  const saveActivity = async (activityTypeId, body) => {
    dispatch(startLoading());
    let response = await postAddActivity(activityTypeId, body);
    if (response.status === 201) {
      dispatch(setMessage("Saved successfully", "success"));
      dispatch(refreshGraph());
    } else {
      dispatch(setMessage(response.data.detail, "error"));
    }
    dispatch(stopLoading());
  };

  const getActivities = useCallback(
    async (created_gte = "", created_lte = "") => {
      dispatch(startLoading());
      let response = await getActivitiesApi(created_gte, created_lte);
      dispatch(stopLoading());
      if (response.status === 200) {
        return response.data;
      }
      return [];
    },
    [state.user]
  );

  const fetchActivityTypeActivities = useCallback(
    async (days = "7") => {
      dispatch(startLoading());
      let response = await getActivityTypesFetchActivitiesApi(days);
      dispatch(stopLoading());
      return response.data;
    },
    [state.user]
  );

  const updateChartFilter = (filter) => {
    dispatch(setChartFilter(filter));
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
        userGoogleLogin,
        userLogout,
        fetchActivityTypes,
        addActivityType,
        saveActivity,
        getActivities,
        fetchActivityTypeActivities,
        updateChartFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};
