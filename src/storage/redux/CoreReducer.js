import { CONNECTIONS_UPDATE } from "./CoreAction";


const initialState = {
  connections: [],
};

const CoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTIONS_UPDATE: {
      const { connections } = action.payload
      return {
        ...state,
        connections: connections,
      };
    }
    
    default:
      return state;
  }
}

export default CoreReducer;