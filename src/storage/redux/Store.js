import { combineReducers, createStore } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import LoginReducer from "./LoginReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistStore from "redux-persist/es/persistStore";
import CoreReducer from "./CoreReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  LoginReducer,
  CoreReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedRootReducer);
export const persistor = persistStore(store);
