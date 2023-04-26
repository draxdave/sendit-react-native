import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-svg";
import SText from "../../../src/components/SText";
import ProfileIcon from "../assets/images/ProfileIcon";
import DeviceUnknownIcon from "../assets/images/DeviceUnknownIcon";
import MoreIcon from "../assets/images/MoreIcon";
import AppIcon from "../../../assets/AppIcon";
import { TouchableRipple } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInAction } from "../../../src/storage/redux/LoginAction";
import ConnectionComponent from "./ConnectionComponent";
import NoConnectionIcon from "../assets/images/NoConnectionIcon";
import { useCallback, useEffect, useState } from "react";
import { UpdateConnections } from "../../../src/storage/redux/CoreAction";

export default ConnectionListComponent = ({ networkApi }) => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.CoreReducer.connections);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    fetchConnections();
  }, []);

  const fetchConnections = () => {
    setLoading(true);
    let data = {};
    let callback = {
      onSuccess: (response) => {
        setLoading(false);
        dispatch(UpdateConnections(response.data.connections));
      },
      onFailure: (error) => {
        setLoading(false);
      },
    };

    networkApi.call({
      request: "getConnections",
      data: data,
      callback: callback,
    });
  };

  useEffect(() => {
    if (connections.length === 0) {
      fetchConnections();
    }
  }, []);

  return connections.length > 0 ? (
    <FlatList
      data={connections}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => <ConnectionComponent connection={item} />}
      numColumns={2}
      keyExtractor={(item, index) => item.id}
    />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      <View style={styles.emptyContainer}>
        <SText textType="secondary">No paired devices yet. Add one now!</SText>
        <NoConnectionIcon style={styles.emptyIcon} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emptyIcon: {
    marginTop: 16,
  },
  container: {
    backgroundColor: "#33ff00",
    paddingBottom: 100,
  },
  emptyContainer: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
