import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import NetworkApiComponent from "../../src/components/network/NetworkApiComponent";
import { useState } from "react";
import ProductScanRNCamera from "./ProductScanRNCamera";
import BackArrowCurved from "./assets/images/BackArrowCurved";

const ScannerScreen = ({ navigation }) => {
  const [barcode, setBarcode] = useState("");

  if (barcode !== "") {
    // Navigate back
    console.log(` Barcode is here ${barcode}`);
  }

  const validateQrcode = (barcode) => {
    if (barcode.split("::").length === 2) {
      setBarcode(barcode);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ProductScanRNCamera
          onNewQrcode={(qrCode) => validateQrcode(qrCode)}
        />
        <BackArrowCurved style={styles.backArrow} />
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
