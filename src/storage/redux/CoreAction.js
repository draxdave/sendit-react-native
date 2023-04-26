export const CONNECTIONS_UPDATE = "CONNECTIONS_UPDATE";


export const UpdateConnections = (connections) => ({
  type: CONNECTIONS_UPDATE,
  payload: {
    connections,
  },
});
