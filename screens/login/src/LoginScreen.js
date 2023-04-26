import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import "../../../src/translations/i18n";
import { useTranslation } from "react-i18next";
import HeaderComponent from "./components/Header";
import SText from "../../../src/components/SText";
import { version } from "../../../package.json";
import LoginFormComponent from "./components/LoginForm";
import NetworkApiComponent from "../../../src/components/network/NetworkApiComponent";

const LoginScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const [loadingVisible, setLoadingVisible] = useState(false);

  return (
    <NetworkApiComponent>
      <SafeAreaView>
        <View style={styles.container}>
          <HeaderComponent translations={t} />
          <LoginFormComponent setLoading={setLoadingVisible} />
          <SText style={styles.versionText}>{version}</SText>
          <Modal
            animationType="slide"
            transparent={false}
            visible={loadingVisible}
            onRequestClose={() => {
              setLoadingVisible(!loadingVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <ActivityIndicator size="small" color="#0000ff" />
              <SText textType="primary">Loading</SText>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </NetworkApiComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  versionText: {
    alignSelf: "center",
    position: "absolute", //Here is the trick
    bottom: 0,
    color: "#515151",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
