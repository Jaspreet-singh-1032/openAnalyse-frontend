import { API_BASE_URL, post, get } from "./Utils";

export const postActivityType = async (name) => {
  const response = await post(
    `${API_BASE_URL}/api/activities/activity-types/`,
    { name },
    true
  );
  return response;
};

export const getActivityTypes = async () => {
  const response = await get(
    `${API_BASE_URL}/api/activities/activity-types/`,
    true
  );
  return response;
};

export const postAddActivity = async (activityTypeId, body) => {
  const response = await post(
    `${API_BASE_URL}/api/activities/activity-types/${activityTypeId}/add_activity/`,
    body,
    true
  );
  return response;
};

export const getActivitiesApi = async (
  created_gte = "",
  created_lte = "",
  params = {}
) => {
  let filters = [`created__gte=${created_gte}`, `created__lte=${created_lte}`];
  let queryParams = new URLSearchParams(params).toString();
  const response = await get(
    `${API_BASE_URL}/api/activities/?${filters.join("&")}&${queryParams}`,
    true
  );
  return response;
};

export const getActivityTypesFetchActivitiesApi = async (days) => {
  /*
  return all activity_types and total_time_spent on each
  example response :- [
    {
        "id": 1,
        "name": "react",
        "total_time_spent": "4:00:00"
    },
  ]
  */
  const filters = [`days=${days}`];
  const response = await get(
    `${API_BASE_URL}/api/activities/activity-types/fetch_activities/?${filters.join(
      "&"
    )}`,
    true
  );
  return response;
};

export const getTimeSpentEachDayApi = async () => {
  const response = await get(
    `${API_BASE_URL}/api/activities/time_spent_each_day/`,
    true
  );
  return response;
};
