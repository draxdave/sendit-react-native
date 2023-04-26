import { useState, version } from "react";
import "../../../src/translations/i18n";
import { useTranslation } from "react-i18next";
import NetworkApiComponent from "../../../src/components/network/NetworkApiComponent";
import { SafeAreaView, StyleSheet, View } from "react-native";
import SText from "../../../src/components/SText";
import LoadingComponent from "../../../src/components/LoadingComponent";
import HeaderComponent from "./components/Header"
import LoginFormComponent from "./components/LoginForm"
import Constants from "expo-constants";


const LoginScreen = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const [loadingVisible, setLoadingVisible] = useState(false);
  const appVersion = Constants.manifest.version;
  
  return (
    <NetworkApiComponent>
      <SafeAreaView>
        <View style={styles.container}>
          <HeaderComponent translations={t} />
          <LoginFormComponent setLoading={setLoadingVisible} />
          <SText style={styles.versionText}>{appVersion}</SText>
          <LoadingComponent
            isLoading={loadingVisible}
            onRequestClose={() => {
              setLoadingVisible(!loadingVisible);
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
  versionText: {
    alignSelf: "center",
    position: "absolute", //Here is the trick
    bottom: 0,
    color: "#515151",
  },
  
});

export default LoginScreen;
