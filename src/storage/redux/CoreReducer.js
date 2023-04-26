import {
  CONNECTIONS_UPDATE,
  MESSAGES_UPDATE,
  QR_URL_UPDATE,
} from "./CoreAction";

const initialState = {
  connections: [],
  messages: [],
  qrCodeUrl: "",
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
    case QR_URL_UPDATE: {
      const { qrCodeUrl } = action.payload;
      return {
        ...state,
        qrCodeUrl: qrCodeUrl,
      };
    }

    default:
      return state;
  }
};

export default CoreReducer;
