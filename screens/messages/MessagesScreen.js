import { View, Text, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { LoggedInAction } from "../../src/storage/redux/LoginAction";


const MessagesScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const handleLoggedOut = () => {
    dispatch(LoggedInAction(false));
  }

  return (
    <SafeAreaView>
      <View>
        <Text
          onPress={
            handleLoggedOut
          }
        >
          Messages Screen
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;
