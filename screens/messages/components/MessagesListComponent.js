import {
  Alert,
  FlatList,
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

export default MessagesListComponent = ({ networkApi }) => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.CoreReducer.connections);
  // const messages = useSelector((state) => state.CoreReducer.messages);
  const messages = [
    {
      id: 1,
      broadcaster_id: 2,
      connection_id: 7,
      send_date: 1678592584,
      deliver_date: null,
      content: "RESOURCE_NOT_FOUND",
      status: 200,
      last_update: 1678592584,
      meta: {},
      content_type: 100,
      type: 200,
    },
    {
      id: 2,
      broadcaster_id: 2,
      connection_id: 7,
      send_date: 1678592584,
      deliver_date: null,
      content: "RESOURCE_NOT_FOUND",
      status: 200,
      last_update: 1678592584,
      meta: {},
      content_type: 100,
      type: 200,
    },
    {
      id: 3,
      broadcaster_id: 2,
      connection_id: 7,
      send_date: 1678592584,
      deliver_date: null,
      content: "RESOURCE_NOT_FOUND Some s skdjskldjsj dj kldjsn dsnk dskn aksdnksan \n dnaskn. sdsl dsmlsldm lmlsmsd;m lmdslm.",
      status: 200,
      last_update: 1678592584,
      meta: {},
      content_type: 100,
      type: 200,
    },
  ];

  return messages.length > 0 ? (
    <FlatList
      inverted={true}
      data={messages}
      renderItem={({ item }) => <MessageComponent message={item} />}
      keyExtractor={(item, index) => item.id}
    />
  ) : (
    <View style={styles.emptyContainer}>
      <SText textType="secondary">No messages yet. Send one now!</SText>
      <MessageIcon style={styles.emptyIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyIcon: {
    marginTop: 16,
  },
  container: {
    backgroundColor: "#33ff00",
    paddingBottom: 100,
  },
  emptyContainer: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
