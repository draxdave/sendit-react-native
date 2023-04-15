import { View, Text, SafeAreaView } from "react-native";

const ConnectionsScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text
          onPress={() =>
            navigation.navigate({
              name: "Messages",
              params: { text: "Some text" },
            })
          }
        >
          Connections Screen
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ConnectionsScreen;
