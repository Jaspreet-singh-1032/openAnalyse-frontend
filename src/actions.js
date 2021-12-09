import * as actions from "./actionTypes";

export const setUser = (data = {}) => ({
  type: actions.setUser,
  payload: {
    data: data,
  },
});

export const userLogout = () => ({
  type: actions.Logout,
});

export const setMessage = (text = "", variant = "") => ({
  type: actions.setMessage,
  payload: {
    data: { text, variant },
  },
});
