import { IS_LOGGED_IN, API_TOKEN } from "./LoginAction";


const initialState = {
  loggedIn: false
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED_IN: {
      const { isLoggedIn } = action.payload
      return {
        ...state,
        loggedIn: isLoggedIn
      };
    }
    case API_TOKEN: {
      const { token } = action.payload
      return {
        ...state,
        apiToken: token
      };
    }
    default:
      return state;
  }
}

export default LoginReducer;