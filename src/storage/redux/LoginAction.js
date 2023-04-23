export const IS_LOGGED_IN = "IS_LOGGED_IN";

export const LoggedInAction = (isLoggedIn) => ({
  type: IS_LOGGED_IN,
  payload: {
    isLoggedIn,
  },
});
