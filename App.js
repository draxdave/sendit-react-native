import NavComponent from "./screens/navigation/Navigation";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { store, persistor } from "./src/storage/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import SText from "./src/components/SText";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<SText>Loading ...</SText>}>
        <NavComponent />
      </PersistGate>
    </Provider>
  );
}
