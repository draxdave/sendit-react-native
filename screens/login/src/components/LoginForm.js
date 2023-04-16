import { useState } from "react";
import { Button, Image, StyleSheet, TextInput, View } from "react-native";
import md5 from "md5";
import InputEmailIcon from "./images/InputEmailIcon";
import InputPasswordIcon from "./images/InputPasswordIcon";
import SText from "../../../../src/components/SText";

const LoginFormComponent = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    props.setLoading(true);
    console.log(username, password);

    let baseUrl = "http://draxs.com/api";
    const LOGIN_API = "/user/signin";
    const API_VERSION = "/v2";

    let finalUrl = `${baseUrl}${API_VERSION}${LOGIN_API}`;

    const response = fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        device_id: md5("yourOtherValue"),
        instance_id: "",
        password_hash: md5(password),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        props.setLoading(false);
        setMessage(JSON.stringify(json));
        return json.statusCode;
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
        props.setLoading(false);
      });

    console.log(response);
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.inputField}>
          <InputEmailIcon height="50%" width="10%" />
          <TextInput
            style={styles.inputText}
            inputMode="email"
            textContentType="username"
            maxLength={250}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your email address"
          />
        </View>
        <View style={styles.inputField}>
          <InputPasswordIcon height="40%" width="10%" />
          <TextInput
            value={password}
            maxLength={250}
            onChangeText={setPassword}
            textContentType="password"
            placeholder="Enter your Password"
            style={styles.inputText}
          />
        </View>

        <Button title="Sign In" onPress={handleLogin} />
        <SText>{message}</SText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    width: "80%",
    fontSize: 20,
    color: "black",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    width: "20%",
    height: "20%",
  },
});
export default LoginFormComponent;
