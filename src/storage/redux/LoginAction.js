export const IS_LOGGED_IN = "IS_LOGGED_IN";
export const API_TOKEN = "API_TOKEN";

export const LoggedInAction = (isLoggedIn) => ({
  type: IS_LOGGED_IN,
  payload: {
    isLoggedIn,
  },
});

export const ApiTokenAction = (token) => ({
  type: API_TOKEN,
  payload: {
    token,
  },
});
