import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import NetworkApiComponent from "../../src/components/network/NetworkApiComponent";
import { useEffect, useState } from "react";
import PairingCodeScanner from "./components/PairingCodeScannerComponent";
import BackArrowCurved from "./assets/images/BackArrowCurved";

const ScannerScreen = ({ navigation }) => {
  let gotBarcode = false;

  const validateQrcode = (newCode) => {
    if (newCode.split("::").length === 2) {
      if (!gotBarcode) {
        gotBarcode = true;
        // Navigate back
        console.log(` Barcode is here ${newCode}`);
        navigation.navigate("Home", {
          screen: "QR",
          params: { qrCode: newCode },
          merge: true,
        });
      }
    }
  };
  const backClicked = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <PairingCodeScanner onNewQrcode={(qrCode) => validateQrcode(qrCode)} />
        <BackArrowCurved style={styles.backArrow} onPress={backClicked} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    top: 16,
    start: 16,
    padding: 16,
  },
  container: {
    height: "100%",
  },
});

export default ScannerScreen;
