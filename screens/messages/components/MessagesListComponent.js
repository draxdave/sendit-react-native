import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-svg";
import SText from "../../../src/components/SText";
import { TouchableRipple } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import MessageIcon from "../assets/images/MessageIcon";
import MessageComponent from "./MessageComponent";
import { SERVER_ADDRESS } from "../../../config";

export default MessagesListComponent = ({ networkApi }) => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.CoreReducer.connections);
  const messages = useSelector((state) => state.CoreReducer.messages);

  const wallpaper = `${SERVER_ADDRESS}/img/chat_background_02.jpg`;
  console.log(messages);
  console.log(connections);

  return (
    <ImageBackground
      source={{ uri: wallpaper }}
      resizeMode="cover"
      style={styles.container}
    >
      {messages.length > 0 ? (
        <FlatList
          inverted={true}
          data={messages.map((item) => {
            const sender = connections.find(
              (connection) => item.connection_id === connection.id
            );
            item.senderName = sender?.name ?? "Unavailable User";
            return item;
          })}
          renderItem={({ item }) => <MessageComponent message={item} />}
          keyExtractor={(item, index) => item.id}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <SText textType="secondary">No messages yet. Send one now!</SText>
          <MessageIcon style={styles.emptyIcon} />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  emptyIcon: {
    marginTop: 16,
  },
  container: {
    height: "100%",
  },
  emptyContainer: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
