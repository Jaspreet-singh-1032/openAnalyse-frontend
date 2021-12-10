import { BASE_URL, post, get } from "./Utils";

export const postActivityType = async (name) => {
  const response = await post(
    `${BASE_URL}/api/activities/activity-types/`,
    { name },
    true
  );
  return response;
};

export const getActivityTypes = async () => {
  const response = await get(
    `${BASE_URL}/api/activities/activity-types/`,
    true
  );
  return response;
};