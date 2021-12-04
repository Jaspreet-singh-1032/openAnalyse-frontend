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
  return state;
};

export default reducer;
