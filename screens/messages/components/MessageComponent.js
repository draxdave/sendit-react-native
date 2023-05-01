import { Image, Pressable, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import SText from "../../../src/components/SText";

export default MessageComponent = ({ message }) => {
  let lastTouchedDate = new Date(message.send_date * 1000);
  const formattedDate = lastTouchedDate.toLocaleString();

  return (
    <Pressable android_ripple={{ color: "##5dff5c" }} style={styles.container}>
      <Image
        style={styles.messageThumb}
        resizeMode="contain"
        source={require("../../../assets/icon.png")}
        defaultSource={require("../../../assets/icon.png")}
      />
      <View>
        <SText style={styles.senderName}>{message.senderName}</SText>

        <Card style={styles.card} elevation={7}>
          <SText textType="body">{message.content}</SText>
        </Card>
        <SText textType="body" style={styles.sendDate}>{formattedDate}</SText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
  },
  senderName: {
    
    
  },
  card: {
    minWidth: "60%",
    maxWidth: "90%",
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginStart: 8,
  },
  messageThumb: {
    backgroundColor: "black",
    width: 48,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 24,
    borderColor: "grey",
    borderWidth: 1,
  },
  sendDate: {
    color: "grey",
    fontSize: 11,
    position: "relative",
    marginStart: 8,
    
  }
});
