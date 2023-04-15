import { NavigationContainer } from "@react-navigation/native";
import ConnectionsScreen from "../connections/ConnectionsScreen";
import MessagesScreen from "../messages/MessagesScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TabBar from "./TabBar";

const Tab = createMaterialBottomTabNavigator();

const NavComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Messages">
        <Tab.Screen
          name="Connections"
          component={ConnectionsScreen}
          options={{
            tabBarIcon : ({ color }) => (
              <MaterialCommunityIcons
                name="lan-connect"
                color={color}
                size={26}
              />
            )
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarIcon : ({ color }) => (
              <MaterialCommunityIcons
                name="message-flash-outline"
                color={color}
                size={26}
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default NavComponent;
