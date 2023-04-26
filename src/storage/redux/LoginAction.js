export const USER_INFO = "USER_INFO";
export const API_TOKEN = "API_TOKEN";

export const LoggedInAction = (user, device) => ({
  type: USER_INFO,
  payload: {
    user,
    device,
  },
});

export const ApiTokenAction = (token) => ({
  type: API_TOKEN,
  payload: {
    token,
  },
});
