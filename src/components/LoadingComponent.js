import { BlurView } from "@react-native-community/blur";
import { Modal, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import SText from "./SText";

export default LoadingComponent = ({ isLoading, onRequestClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isLoading}
      onRequestClose={() => {
        onRequestClose();
      }}
    >
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.modalContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
        <SText textType="secondary" style={{ color: "black" }}>
          Loading...
        </SText>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
