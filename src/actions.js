import * as actions from "./actionTypes";

export const setUser = (data = {}) => ({
  type: actions.setUser,
  payload: {
    data: data,
  },
});

export const userLogoutAction = () => ({
  type: actions.Logout,
});

export const setMessage = (text = "", variant = "") => ({
  type: actions.setMessage,
  payload: {
    data: { text, variant },
  },
});

export const setActivityTypes = (activityTypes = []) => ({
  type: actions.setActivityTypes,
  payload: {
    data: activityTypes,
  },
});

export const addActivityTypeAction = (id, name) => ({
  type: actions.addActivityType,
  payload: {
    data: { id, name },
  },
});

export const setActivities = (activities = []) => ({
  type: actions.setActivities,
  payload: {
    data: activities,
  },
});

export const addActivity = (id, time_spent, activity_type) => ({
  type: actions.addActivity,
  payload: {
    data: { id, time_spent, activity_type },
  },
});
