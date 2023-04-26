import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import NetworkApiComponent from "../../src/components/network/NetworkApiComponent";
import ProfileComponent from "./components/ProfileComponent";

const ConnectionsScreen = ({ navigation }) => {
  return (
    
      <SafeAreaView>
        <View style={styles.container}>
          <ProfileComponent/>
        </View>
      </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  
});


export default ConnectionsScreen;
