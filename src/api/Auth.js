import { BASE_URL, postData } from "./Utils";

export const userLoginApi = async (data = {}) => {
  const response = await postData(`${BASE_URL}/api/user/login/`, data);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response;
};

export const userRegisterApi = async (data = {}) => {
  const response = await postData(`${BASE_URL}/api/user/register/`, data);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response;
};
