import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import NetworkApiComponent from "../../src/components/network/NetworkApiComponent";
import QRDisplayComponent from "./components/QRDisplayComponent";
import { useEffect, useState } from "react";
import LoadingComponent from "../../src/components/LoadingComponent";
import Toast from "react-native-toast-message";

const QRScreen = ({ navigation, route, networkApi }) => {
  const [loading, setLoading] = useState(false);
  const onOpenScanner = () => {
    navigation.navigate("Scanner");
  };

  useEffect(() => {
    if (route.params?.qrCode) {
      console.log(`Go to pairing ${route.params?.qrCode}`);
    }
  }, [route.params?.qrCode]);

  const handlePairRequest = (qrCode) => {
    const data = {
      request_code: qrCode,
    };
    const callback = {
      onSuccess: (json) => {
        Toast.show({
          type: "success",
          text1: "The new device is added successfully. You can new share content with it.",
          text2: "Go to 'Devices' page to see the list of active devices.",
        });
      },
      onFailure: (json) => {
        Toast.show({
          type: "error",
          text1: "An error occurred",
          text2: json.error.description,
        });
      },
    };
    networkApi.call("pairDevice", data, callback);
  };

  return (
    <NetworkApiComponent>
      <SafeAreaView>
        <View style={styles.container}>
          <QRDisplayComponent
            openScanner={onOpenScanner}
            setLoading={(show) => {
              setLoading(show);
            }}
          />
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
