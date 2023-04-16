import { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import TickIcon from "./assets/images/Tick";
import DeviceIcon from "./assets/images/DeviceIcon";


const LoginScreen = ({ navigation, route }) => {
  const gotoConnections = () => {
    navigation.navigate("Home");
  };
  
  return (
    <SafeAreaView>
      <View>
        <Text onPress={gotoConnections}>
          Login Screen `{route.params?.text}`
        </Text>
       <TickIcon width={120} height={40}/>
       <DeviceIcon/>
      </View>
    </SafeAreaView>

  );
};

export default LoginScreen;
