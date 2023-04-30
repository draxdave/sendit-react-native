import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MessagesScreen from "../messages/MessagesScreen";
import ConnectionsScreen from "../connections/ConnectionsScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StatusBar } from "react-native";
import QRScreen from "../QR/QRScreen";
import ShareModal from "../Share/ShareModal";

const Tab = createMaterialBottomTabNavigator();
const HomeScreen = () => {
  return (<>
    <Tab.Navigator initialRouteName="Messages">
      <Tab.Screen
        name="QR"
        component={QRScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode"
              color={color}
              size={26}
            />
          ),
        }}
      />
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
    <ShareModal />
    </>
  );
};
export default HomeScreen;
