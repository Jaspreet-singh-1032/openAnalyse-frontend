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

export const postAddActivity = async (activityTypeId, timeSpent) => {
  const response = await post(
    `${BASE_URL}/api/activities/activity-types/${activityTypeId}/add_activity/`,
    { time_spent: timeSpent },
    true
  );
  return response;
};

export const getActivitiesApi = async (created_gte = "", created_lte = "") => {
  let filters = [`created__gte=${created_gte}`, `created__lte=${created_lte}`];
  const response = await get(
    `${BASE_URL}/api/activities/?${filters.join("&")}`,
    true
  );
  return response;
};

export const getActivityTypesFetchActivitiesApi = async () => {
  /*
  return all activitt_types and total_time_spent on each
  example response :- [
    {
        "id": 1,
        "name": "react",
        "total_time_spent": "4:00:00"
    },
  ]
  */
  const response = await get(
    `${BASE_URL}/api/activities/activity-types/fetch_activities/`,
    true
  );
  return response;
};
