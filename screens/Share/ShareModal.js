import { useState } from "react";
import {
  DeviceEventEmitter,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import LoadingComponent from "../../src/components/LoadingComponent";
import NoConnectionIcon from "../connections/assets/images/NoConnectionIcon";
import ConnectionComponent from "../connections/components/ConnectionComponent";
import SText from "../../src/components/SText";
import ShareConnectionComponent from "./components/ShareConnectionComponent";
import { useEffect } from "react";
import MessageComponent from "../messages/components/MessageComponent";

export default ShareModal = ({ networkApi }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const connections = useSelector((state) => state.CoreReducer.connections);
  const [loading, setLoading] = useState(false);
  const [textToShare, setTextToShare] = useState(null);

  useEffect(() => {
    DeviceEventEmitter.addListener("broadcaster-data-received", (data) => {
      const event = data["event"];
      if (event === "newSharedText"){
        const text = data["text"];
        console.log("New text to share received: ", text);

      }
    });
  }, []);
  
  if(textToShare){
    setModalVisible(true)
  }

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <SText style={styles.headerText} textType="Secondary">
                Send It!
              </SText>
              <SText style={styles.subHeader} textType="body">
                Select a connection to share the content with.
              </SText>
              <MessageComponent message={{
                send_date: new Date().toISOString(),
                content: textToShare,
                
              }} />
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
                style={styles.closeBtn}
              >
                <Image
                  source={require("./assets/images/closeIcon.png")}
                  style={{ width: 12, height: 12 }}
                />
              </Pressable>
            </View>
            {connections.length > 0 ? (
              <FlatList
                contentContainerStyle={{ paddingBottom: 20 }}
                style={styles.list}
                data={connections}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => {
                      setModalVisible(false);
                    }}
                  />
                }
                renderItem={({ item }) => (
                  <ShareConnectionComponent connection={item} />
                )}
                keyExtractor={(item, index) => item.id}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <SText textType="secondary">No paired devices yet.</SText>
                <NoConnectionIcon />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    padding: 8,
    position: "absolute",
    end: 0,
    margin: 16,
    tintColor: "#444",
  },
  emptyContainer: {
    padding: 16,
    margin: 16,
    height: "50%",
    alignSelf: "center",
    alignItems: "center",
  },
  list: {
    maxHeight: "80%",
    minHeight: "40%",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 13,
  },
  headerText: {
    fontSize: 18,
  },
  subHeader: {
    fontSize: 14,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    elevation: 12,
  },
  modalContainer: {
    backgroundColor: "rgba(255, 255, 255,.4)",
    flexDirection: "column-reverse",
    flex: 1,
  },
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
