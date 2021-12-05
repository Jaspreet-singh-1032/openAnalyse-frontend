import { BASE_URL, postData } from "./Utils";

export const postActivityType = async (data = {}) => {
  const response = await postData(
    `${BASE_URL}/api/activities/activity-types/`,
    data,
    true
  );
  return response;
};
