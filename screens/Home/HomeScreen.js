import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MessagesScreen from "../messages/MessagesScreen";
import ConnectionsScreen from "../connections/ConnectionsScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();
const HomeScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Connections">
      <Tab.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="lan-connect"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-flash-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeScreen;
