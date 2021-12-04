export const BASE_URL = "http://127.0.0.1:8000";

export const postData = async (url, data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response);
  const content = await response.json();
  return { status: response.status, data: content };
};
