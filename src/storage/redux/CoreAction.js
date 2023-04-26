export const CONNECTIONS_UPDATE = "CONNECTIONS_UPDATE";
export const MESSAGES_UPDATE = "MESSAGES_UPDATE";


export const UpdateConnections = (connections) => ({
  type: CONNECTIONS_UPDATE,
  payload: {
    connections,
  },
});

export const UpdateMessages = (messages) => ({
  type: MESSAGES_UPDATE,
  payload: {
    messages,
  },
});
