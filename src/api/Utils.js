// export const BASE_URL = "https://openanalyse.herokuapp.com";
export const BASE_URL = "http://127.0.0.1:8000";

export const post = async (url, data = {}, authenticate = false) => {
  /*
  url : api url to call
  data : data in request body
  authenticate : whether to add auth token in api call or not
  */
  let headers = {
    "Content-Type": "application/json",
  };

  headers = authenticate
    ? { ...headers, Authorization: `Token ${localStorage.getItem("token")}` }
    : headers;
  const response = await fetch(url, {
    method: "POST",
    headers: { ...headers },
    body: JSON.stringify(data),
  }).then((response) => response);

  const content = await response.json();
  return { status: response.status, data: content };
};

export const get = async (url, authenticate = false) => {
  /*
  url : api url to call
  data : data in request body
  authenticate : whether to add auth token in api call or not
  */
  let headers = {
    "Content-Type": "application/json",
  };

  headers = authenticate
    ? { ...headers, Authorization: `Token ${localStorage.getItem("token")}` }
    : headers;
  const response = await fetch(url, {
    method: "GET",
    headers: { ...headers },
  }).then((response) => response);

  const content = await response.json();
  return { status: response.status, data: content };
};
