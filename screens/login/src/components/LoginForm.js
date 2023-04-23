import { useState } from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import md5 from "md5";
import InputEmailIcon from "./images/InputEmailIcon";
import InputPasswordIcon from "./images/InputPasswordIcon";
import SText from "../../../../src/components/SText";
import MainApi from "../../../../src/components/network/MainApi";
import GoogleIcon from "./images/GoogleIcon";
import { useSelector, useDispatch } from "react-redux";
import { LoggedInAction } from "../../../../src/storage/redux/LoginAction";

const LoginFormComponent = (props) => {
  const [username, setUsername] = useState("");
  const [usernameValidation, setUsernameValidation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleLoggedIn = () => {
    dispatch(LoggedInAction(true));
  };

  const checkIfUsernamePasswordValidThenLogin = () => {
    setMessage("");
    let isUsernameValid = false;
    let isPasswordValid = false;
    if (username.length === 0) {
      setUsernameValidation("Required");
    } else if (username.length > 250) {
      setUsernameValidation("Too long");
    } else {
      setUsernameValidation("");
      isUsernameValid = true;
    }

    if (password.length === 0) {
      setPasswordValidation("Required");
    } else if (password.length > 250) {
      setPasswordValidation("Too long");
    } else {
      setPasswordValidation("");
      isPasswordValid = true;
    }
    if (isPasswordValid && isUsernameValid) {
      tryLogin();
    }
  };

  const tryLogin = () => {
    props.setLoading(true);
    console.log(username, password);
    let data = {
      email: username,
      device_id: md5("yourOtherValue"),
      instance_id: "instance_id",
      password_hash: md5(password),
    };
    let callback = {
      onSuccess: (response) => {
        let token = response.data.token;
        props.setLoading(false);
        handleLoggedIn(token);
      },
      onFailure: (error) => {
        console.log(error);
        props.setLoading(false);

        let message = error.error.description;

        setMessage(message);
      },
    };

    MainApi({
      request: "signin",
      data: data,
      callback: callback,
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.inputField}>
          <InputEmailIcon height="50%" width="10%" />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              inputMode="email"
              textContentType="username"
              maxLength={250}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your email address"
            />
            <SText style={styles.inputError} textType="secondary">
              {usernameValidation}
            </SText>
          </View>
        </View>
        <View style={styles.inputField}>
          <InputPasswordIcon height="40%" width="10%" />
          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              maxLength={250}
              onChangeText={setPassword}
              textContentType="password"
              placeholder="Enter your Password"
              style={styles.inputText}
            />
            <SText style={styles.inputError} textType="secondary">
              {passwordValidation}
            </SText>
          </View>
        </View>
        <SText style={styles.forgetPassword} textType="secondary">
          Forgot your password?
        </SText>

        <Button
          title="Sign In"
          onPress={checkIfUsernamePasswordValidThenLogin}
          color="#7151ff"
          style={styles.submitButton}
        />
        <SText style={styles.formMessage}>{message}</SText>
        <SText textType="secondary">Create An Account Now!</SText>

        <Pressable
          style={styles.googleSignIn}
          android_ripple={{ color: "#000" }}
          onPress={handleLoggedIn}
        >
          <GoogleIcon />
          <SText textType="secondary" style={styles.googleSignInText}>
            Sign In With Google
          </SText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
  },
  inputError: {
    color: "#994444",
    marginLeft: 10,
  },
  formMessage: {
    color: "#994444",
  },
  googleSignIn: {
    marginTop: 16,
    backgroundColor: "#232323",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleSignInText: {
    fontSize: 18,
    color: "#fff",
    marginStart: 16,
  },
  forgetPassword: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    textDecorationLine: "underline",
    marginTop: 8,
    color: "#656565",
    paddingLeft: 12,
  },
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
    width: "100%",
    fontSize: 20,
    color: "black",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
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
  submitButton: {
    color: "#7151ff",
    margin: 16,
  },
});
export default LoginFormComponent;
