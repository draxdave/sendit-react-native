import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import NetworkApiComponent from "../../src/components/network/NetworkApiComponent";
import QRDisplayComponent from "./components/QRDisplayComponent";
import { useEffect, useRef, useState } from "react";
import LoadingComponent from "../../src/components/LoadingComponent";
import Toast from "react-native-toast-message";

const QRScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

  let networkApi = useRef();

  const onOpenScanner = () => {
    navigation.setParams({
      qrCode: null,
    });
    navigation.navigate("Scanner");
  };

  useEffect(() => {
    if (route.params?.qrCode) {
      let qrCode = route.params?.qrCode;
      if (qrCode) {
        console.log(`Go to pairing ${qrCode}`);
        handlePairRequest(qrCode);
        setLoading(true);
      } else {
        // setLoading(false);
        console.log(`No pairing code`);
        // handlePairRequest("qrCode");
      }
    }
  }, [route.params?.qrCode]);

  const handlePairRequest = async (qrCode) => {
    console.log(`Errorrrrr: ${loading}`);
    const data = {
      request_code: qrCode,
    };
    const callback = {
      onSuccess: (json) => {
        setLoading(false);
        Toast.show({
          type: "success",
          text1:
            "The new device is added successfully.",
          text2: " You can new share content with it.",
        });
        navigation.navigate("Connections");
      },
      onFailure: (json) => {
        console.log(`Errorrrrr: ${json.error.description}`);
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "An error occurred",
          text2: json.error.description,
        });
      },
    };
    networkApi.call({
      request: "pairDevice",
      data: data,
      callback: callback,
    });
  };

  return (
    <NetworkApiComponent innerRef={(ref) => (networkApi = ref)}>
      <SafeAreaView>
        <View style={styles.container}>
          <QRDisplayComponent openScanner={onOpenScanner} />
          <LoadingComponent
            isLoading={loading}
            onRequestClose={() => {
              setLoading(false);
            }}
          />
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
