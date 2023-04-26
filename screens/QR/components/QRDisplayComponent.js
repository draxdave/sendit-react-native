import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../src/components/LoadingComponent";
import { useEffect, useState } from "react";
import { UpdateQRUrl } from "../../../src/storage/redux/CoreAction";
import { BASE_URL } from "../../../config";

export default QRDisplayComponent = ({ networkApi }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //   const qrCodeUrl = "https://static.invertase.io/assets/sidebar/notifee.png";
  const qrCodeUrl = useSelector((state) => state.CoreReducer.qrCodeUrl);
  const fetchQrUrl = () => {
    setLoading(true);
    let data = {};
    let callback = {
      onSuccess: (response) => {
        dispatch(UpdateQRUrl(`${BASE_URL}${response.data.qr_url}`));
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
console.log(`qrCodeUrl ${qrCodeUrl}`);
  return (
    <View style={styles.container}>
      <Image
        style={styles.qrCodeImage}
        resizeMode="contain"
        source={{ uri: qrCodeUrl }}
        onLoad={()=>{setLoading(false)}}
        defaultSource={require("../../../assets/icon.png")}
      />
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
  qrCodeImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    position: "absolute",
  },
  container: {
    height: "100%",
  },
});
