import { AsyncStorage } from "react-native";
import { createStore } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import isLoggedInReducer from "./LoginReducer";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, isLoggedInReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
