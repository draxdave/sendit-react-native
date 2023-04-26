import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import NetworkApiComponent from "../../src/components/network/NetworkApiComponent";
import QRDisplayComponent from "./components/QRDisplayComponent";

const QRScreen = ({ navigation }) => {
  
  return (
    <NetworkApiComponent>
      <SafeAreaView>
        <View style={styles.container}>
          <QRDisplayComponent />
        </View>
      </SafeAreaView>
    </NetworkApiComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default QRScreen;
