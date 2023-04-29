import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { LoggedInAction } from "../../src/storage/redux/LoginAction";
import NetworkApiComponent from "../../src/components/network/NetworkApiComponent";
import MessagesListComponent from "./components/MessagesListComponent";
import { useEffect } from "react";
import { OP_NEW_CONTENT } from "../../src/components/Push/Config";
import { UpdateMessages } from "../../src/storage/redux/CoreAction";


const MessagesScreen = ({ navigation }) => {
  
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
