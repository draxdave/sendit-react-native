import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextStyle,
} from "react-native";
import React, { FunctionComponent, useEffect, useState } from "react";
import * as Font from "expo-font";

type CustomTextProps = {
  style?: TextStyle | TextStyle[],
  textType?: "primary" | "secondary" | "body",
};
const SText: FunctionComponent<CustomTextProps> = ({
  children,
  textStyle,
  textType,
  style,
}) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "dosis": require("../../assets/fonts/dosis.ttf"),
      });
      await Font.loadAsync({
        "dosis_bold": require("../../assets/fonts/dosis_bold.ttf"),
      });
      await Font.loadAsync({
        "roboto_regular": require("../../assets/fonts/roboto_regular.ttf"),
      });
      await Font.loadAsync({
        "sf_pro": require("../../assets/fonts/sf_pro.ttf"),
      });
      
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  switch (textType) {
    case "primary":
      textStyle = styles.primary;
      break;
    case "secondary":
      textStyle = styles.secondary;
      break;
    case "body":
      textStyle = styles.body;
      break;
    default:
      textStyle = styles.primary;
      break;
  }
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return <Text style={[textStyle, { ...passedStyles }]}>{children}</Text>;
};
const styles = StyleSheet.create({
  primary: {
    fontFamily: "dosis_bold",
  },
  secondary: {
    fontFamily: "sf_pro",
  },
  body: {
    fontFamily: "roboto_regular",
  },
});
export default SText;
