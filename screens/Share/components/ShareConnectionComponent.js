import { Image, Pressable, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import SText from "../../../src/components/SText";

export default ShareConnectionComponent = ({ connection }) => {
  let lastTouchedDate = new Date(connection.last_used * 1000);
  const formattedDate = lastTouchedDate.toLocaleString();

  return (
    <Card style={styles.card} elevation={1}>
      <Pressable android_ripple={{ color: "#ccc" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.connectionThumb}
            resizeMode="contain"
            source={require("../../../assets/icon.png")}
            defaultSource={require("../../../assets/icon.png")}
          />
          <View style={{justifyContent: "space-around"}}>
            <SText style={styles.connectionName}>{connection.name}</SText>
            <SText style={styles.connectionSubtitle} textType="body">
              Last Used: {formattedDate}
            </SText>
          </View>
        </View>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  connectionName: {
    paddingHorizontal: 8,
  },
  connectionSubtitle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    color: "grey",
  },
  card: {
    overflow: "hidden",
    padding: "1%",
    margin: "1%",
    backgroundColor: "#eee"
  },
  connectionThumb: {
    tintColor: "#304333",
    width: 64,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 7,
  },
});
