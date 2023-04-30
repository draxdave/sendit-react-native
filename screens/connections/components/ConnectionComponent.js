import { Image, Pressable, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import SText from "../../../src/components/SText";
import TrashBinIcon from "../assets/images/TrashBinIcon";

export default ConnectionComponent = ({ connection }) => {
  let lastTouchedDate = new Date(connection.last_used * 1000);
  const formattedDate = lastTouchedDate.toLocaleString();

  return (
    <Card style={styles.card} elevation={7}>
      <Pressable android_ripple={{ color: "#444" }}>
        <View style={{ flexDirection: "column" }}>
          <Image
            style={styles.connectionThumb}
            resizeMode="contain"
            source={require("../../../assets/icon.png")}
            defaultSource={require("../../../assets/icon.png")}
          />
          <SText style={styles.connectionName}>{connection.name}</SText>
          <SText style={styles.connectionSubtitle} textType="body">
            {formattedDate}
          </SText>
          <TrashBinIcon style={styles.trashIcon} />
        </View>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  trashIcon: {
    position: "absolute",
    top: 0,
    end: 0,
    padding: 8,
    margin: 8,
  },
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
    width: "48%",
  },
  connectionThumb: {
    tintColor: "#304333",
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 7,
  },
});
