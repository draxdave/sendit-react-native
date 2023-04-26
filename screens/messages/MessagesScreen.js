import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { LoggedInAction } from "../../src/storage/redux/LoginAction";
import NetworkApiComponent from "../../src/components/network/NetworkApiComponent";
import MessagesListComponent from "./components/MessagesListComponent";


const MessagesScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const handleLoggedOut = () => {
    dispatch(LoggedInAction(false));
  }

  return (
    <NetworkApiComponent>
      <SafeAreaView>
        <View style={styles.container}>
          <MessagesListComponent />
        </View>
      </SafeAreaView>
    </NetworkApiComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default MessagesScreen;
