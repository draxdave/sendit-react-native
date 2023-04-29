import { Image, Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../src/components/LoadingComponent";
import { useEffect, useState } from "react";
import { UpdateQRUrl } from "../../../src/storage/redux/CoreAction";
import { BASE_URL, SERVER_ADDRESS } from "../../../config";
import { Button, Card } from "react-native-paper";
import SText from "../../../src/components/SText";
import QrCodeIcon from "../assets/images/QrCodeIcon";
import ScanIcon from "../assets/images/ScanIcon";

export default QRDisplayComponent = ({ networkApi }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(false);

  const qrCodeUrl = useSelector((state) => state.CoreReducer.qrCodeUrl);

  const fetchQrUrl = () => {
    setLoading(true);
    let data = {};
    let callback = {
      onSuccess: (response) => {
        dispatch(UpdateQRUrl(`${SERVER_ADDRESS}${response.data.qr_url}`));
      },
      onFailure: (error) => {
        setLoading(false);
      },
    };

    networkApi.call({
      request: "getQr",
      data: data,
      callback: callback,
    });
  };

  useEffect(() => {
    if (qrCodeUrl === "" || qrCodeUrl === undefined || qrCodeUrl == null) {
      fetchQrUrl();
    }
  }, []);

  const handleScanQrClick = () => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status === "authorized") {
        setHasPermission(true);
      }
    })();
  };

  return (
    <View style={styles.container}>
      <View borderRadius={6} style={styles.smallBgIcon}>
        <QrCodeIcon width="96" height="96" />
      </View>
      <Card elevation={7} style={styles.card}>
        <Image
          style={styles.qrCodeImage}
          resizeMode="contain"
          source={{ uri: qrCodeUrl }}
          onLoad={() => {
            setLoading(false);
          }}
          defaultSource={require("../../../assets/icon.png")}
        />
      </Card>
      <View>
        <SText textType="secondary">
          Use this QR code to connect to other devices. Or you can scan QR code
          on your other devices.
        </SText>

        <SText textType="primary" styles={styles.learnMore}>
          Learn More
        </SText>
      </View>

      <View style={styles.scanBtnContainer}>
        <Pressable
          android_ripple={{ color: "#9f9" }}
          style={styles.scanBtnPressable}
        >
          <ScanIcon width={24} height={24} style={styles.scanBtnIcon} />
          <SText style={styles.scanBtnText}>Scan</SText>
        </Pressable>
      </View>

      <LoadingComponent
        isLoading={loading}
        onRequestClose={() => {
          setLoading(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scanBtnText: {
    color: "white",
    fontSize: 23,
  },
  scanBtnIcon: {
    position: "absolute",
    right: 16,
  },
  scanBtnPressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  scanBtnContainer: {
    overflow: "hidden",
    backgroundColor: "#349A4F",
    borderRadius: 24,
    width: "100%",
  },
  learnMore: {
    textDecorationLine: "underline",
  },
  smallBgIcon: {
    backgroundColor: "#349A4F",
    borderRadius: 64,
    padding: 16,
    alignSelf: "center",
    marginTop: 128,
    position: "absolute",
    overflow: "hidden",
  },
  card: {
    padding: 8,
    margin: 16,
    backgroundColor: "white",
  },
  qrCodeImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    height: "100%",
    marginHorizontal: 16,
    justifyContent: "space-evenly",
  },
});
