import * as actions from "./actionTypes";

const reducer = (state = {}, action) => {
  if (action.type === actions.setUser) {
    return { ...state, user: { ...action.payload.data } };
  }

  if (action.type === actions.Logout) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return { ...state, user: {} };
  }

  if (action.type === actions.setMessage) {
    return { ...state, message: action.payload.data };
  }

  if (action.type === actions.setActivityTypes) {
    return {
      ...state,
      activityTypes: action.payload.data,
    };
  }

  if (action.type === actions.addActivityType) {
    return {
      ...state,
      activityTypes: [...state.activityTypes, action.payload.data],
    };
  }
  return state;
};

export default reducer;
