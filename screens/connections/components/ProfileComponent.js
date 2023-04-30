import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-svg";
import SText from "../../../src/components/SText";
import ProfileIcon from "../assets/images/ProfileIcon";
import DeviceUnknownIcon from "../assets/images/DeviceUnknownIcon";
import MoreIcon from "../assets/images/MoreIcon";
import AppIcon from "../../../assets/AppIcon";
import { TouchableRipple } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInAction } from "../../../src/storage/redux/LoginAction";

export default ProfileComponent = ({ networkApi }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.LoginReducer.user);
  const device = useSelector((state) => state.LoginReducer.device);

  const callSignOut = () => {
    let data = {};
    let callback = {
      onSuccess: (response) => {},
      onFailure: (error) => {},
    };

    networkApi.call({
      request: "signout",
      data: data,
      callback: callback,
    });
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout?",
      "Are you sure you want to log out?",
      [
        {
          text: "Yes, please log out",
          onPress: () => {
            dispatch(LoggedInAction(null, null));
            callSignOut();
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  let date = new Date(device.last_touch * 1000);
  const formattedDate = date.toLocaleString();

  return (
    <View style={styles.container}>
      <AppIcon style={styles.appIcon} bw={true} />
      <Pressable
        onPress={handleLogout}
        style={styles.moreButton}
        android_ripple={{ color: "#aaa" }}
      >
        <SText style={styles.logout}>Logout</SText>
        {/* <MoreIcon /> */}
      </Pressable>
      <View style={styles.headerTextContainer}>
        <View style={styles.headerTextRow}>
          <ProfileIcon />
          <SText style={styles.headerText}>{user.email}</SText>
        </View>
        <View style={styles.headerTextRow}>
          <DeviceUnknownIcon />
          <SText style={styles.headerText}>{device.model}</SText>
        </View>
        <SText style={styles.headerSubText}>Last Used: {formattedDate}</SText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
    color: "#333",
    paddingHorizontal:8,
    paddingVertical: 4,
    borderColor: "#333",
    borderWidth: 1,
  },
  moreButton: {
    position: "absolute",
    padding: 8,
    end: 8,
    top: 16,
  },
  appIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    opacity: 0.5,
  },
  headerText: {
    color: "#444",
    marginStart: 4,
  },
  headerSubText: {
    color: "#888",
    paddingVertical: 4,
    marginStart: 27,
  },
  headerTextRow: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  headerTextContainer: {
    position: "absolute",
    bottom: 16,
    start: 16,
  },
  container: {
    height: 250,
    backgroundColor: "#eaf4f0",
  },
});
