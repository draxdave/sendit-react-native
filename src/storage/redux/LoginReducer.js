import { USER_INFO, API_TOKEN } from "./LoginAction";


const initialState = {
  user: null,
  device: null,
  apiToken: null
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO: {
      const { user, device } = action.payload
      return {
        ...state,
        user: user,
        device: device,
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