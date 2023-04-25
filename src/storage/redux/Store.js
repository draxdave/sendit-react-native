import { createStore } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import LoginReducer from "./LoginReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, LoginReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
