import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../login/src/LoginScreen";
import { useState } from "react";
import HomeScreen from "../Home/HomeScreen";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const NavComponent = () => {
  const user = useSelector((state) => state.user);
  const device = useSelector((state) => state.device);
  console.log(user);
  
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
