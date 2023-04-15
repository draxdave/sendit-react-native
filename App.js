import { StyleSheet, Text, View } from "react-native";
import NavComponent from "./screens/navigation/Navigation";

export default function App() {
  return (
        <NavComponent />
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
