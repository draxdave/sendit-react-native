import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import SText from "../../../../src/components/SText";

const HeaderComponent = (props) => {
  const t = props.translations;

  return (
    <View style="">
      <Image
        style={styles.image}
        source={require("./images/login_moving_bg.jpg")}
      />
      <SText style={styles.text} textType="primary" >{t('appName')}</SText>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  image: {
    backgroundColor: "#ddd",
    height: 250,
    width: "100%",
  },
  text: {
    fontSize: 48,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: -16
  },
});
