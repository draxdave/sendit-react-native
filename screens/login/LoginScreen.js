import { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
// import { Tick } from "./tick.svg";



const LoginScreen = ({ navigation, route }) => {
  const gotoConnections = () => {
    navigation.navigate("Connections");
  };
  const [uri, setUri] = useState(
    'tick.svg',
  );
  
  return (
    <SafeAreaView>
      <View>
        <Text onPress={gotoConnections}>
          Login Screen `{route.params?.text}`
        </Text>
        {/* <Tick width={120} height={40}/> */}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
