import { View, Text, SafeAreaView } from "react-native";

const LoginScreen = ({ navigation, route }) => {
  const gotoConnections = () => {
    navigation.navigate("Connections");
  };

  return (
    <SafeAreaView>
      <View>
        <Text onPress={gotoConnections}>
          Login Screen `{route.params?.text}`
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
