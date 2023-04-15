import { View, Text, SafeAreaView } from "react-native";

const MessagesScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text
          onPress={() =>
            navigation.navigate({
              name: "Connections",
              params: { text: "Some text" },
            })
          }
        >
          Messages Screen
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;
