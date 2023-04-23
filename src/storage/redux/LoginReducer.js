import { IS_LOGGED_IN } from "./LoginAction";


const initialState = {
  loggedIn: false
};

const isLoggedInReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED_IN: {
      const { isLoggedIn } = action.payload
      return {
        ...state,
        loggedIn: isLoggedIn
      };
    }
    default:
      return state;
  }
}

export default isLoggedInReducer;