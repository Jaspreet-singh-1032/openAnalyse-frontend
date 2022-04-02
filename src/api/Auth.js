import { API_BASE_URL, post, get } from "./Utils";

export const userLoginApi = async (email, password) => {
  const response = await post(`${API_BASE_URL}/api/user/login/`, {
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
  return response;
};

export const userRegisterApi = async (email, password, username) => {
  const response = await post(`${API_BASE_URL}/api/user/register/`, {
    email,
    password,
    username,
  });
  localStorage.setItem("token", response.data.token);
  return response;
};

export const getUserApi = async () => {
  const response = await get(`${API_BASE_URL}/api/user/`, true);
  return response;
};

export const googleAuthLoginApi = async (accessToken) => {
  const response = await post(`${API_BASE_URL}/rest-auth/google/`, {
    access_token: accessToken,
  });
  localStorage.setItem("token", response.data.key);
  return response;
};
