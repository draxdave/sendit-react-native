import { CONNECTIONS_UPDATE, MESSAGES_UPDATE } from "./CoreAction";

const initialState = {
  connections: [],
  messages: [],
};

const CoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTIONS_UPDATE: {
      const { connections } = action.payload;
      return {
        ...state,
        connections: connections,
      };
    }
    case MESSAGES_UPDATE: {
      const { messages } = action.payload;
      return {
        ...state,
        messages: messages,
      };
    }

    default:
      return state;
  }
};

export default CoreReducer;
