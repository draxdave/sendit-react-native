export const CONNECTIONS_UPDATE = "CONNECTIONS_UPDATE";
export const MESSAGES_UPDATE = "MESSAGES_UPDATE";
export const QR_URL_UPDATE = "QR_URL_UPDATE";


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

export const UpdateQRUrl = (qrCodeUrl) => ({
  type: QR_URL_UPDATE,
  payload: {
    qrCodeUrl,
  },
});
