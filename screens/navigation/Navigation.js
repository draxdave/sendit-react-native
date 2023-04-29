import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../login/src/LoginScreen";
import { useEffect, useState } from "react";
import HomeScreen from "../Home/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { UpdateMessages } from "../../src/storage/redux/CoreAction";
import messaging from "@react-native-firebase/messaging";
import { OP_NEW_CONTENT } from "../../src/components/Push/Config";

const Stack = createNativeStackNavigator();

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!");
});

const NavComponent = () => {
  const dispatch = useDispatch();

  const handleNewContent = (content) => {
    dispatch(UpdateMessages(content));
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      switch (remoteMessage.data.op) {
        case OP_NEW_CONTENT:
          handleNewContent(JSON.parse(remoteMessage.data.data));
          break;

        default:
      }
    });

    return unsubscribe;
  }, []);

  const user = useSelector((state) => state.LoginReducer.user);
  const device = useSelector((state) => state.LoginReducer.device);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user == null || device == null ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavComponent;
