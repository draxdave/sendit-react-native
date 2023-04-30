import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default ShareModal = ({ networkApi }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Text style={styles.modalText}>Hello World!</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
