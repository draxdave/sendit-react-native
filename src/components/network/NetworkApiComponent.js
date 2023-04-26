import { Children, cloneElement, isValidElement } from "react";
import { API_VERSION, BASE_URL_LOCAL, BASE_URL_PRD } from "../../../config";
import * as Localization from "expo-localization";
import Constants from "expo-constants";
import { Device } from "expo-device";
import { Platform } from "react-native";

import { useSelector } from "react-redux";

type MainApiProps = {
  request: "signin" | "signup" | "googleSignIn",
  callback: ApiResult,
  data: any,
};

type ApiResult = {
  onSuccess: () => {},
  onFailure: () => {},
};

interface MainApiInterface {
    call(props: MainApiProps): void
}

class MainApi implements MainApiInterface {
  constructor(apiToken: String = "") {
    this.apiToken = apiToken;
  }
  call({request, data, callback}) {
    switch (request) {
      case "signin":
        this.signinCall(data, callback);
        break;
      case "signup":
        break;
      case "googleSignIn":
        this.signinSsoCall(data, callback);
        break;
      default:
    }
  }

  signinCall(body, callback: ApiResult) {
    const LOGIN_API = "/user/signin";
    this.exec(LOGIN_API, "POST", body, callback);
  }

  signinSsoCall(body, callback: ApiResult) {
    const targetApi = "/user/signin_sso";
    this.exec(targetApi, "POST", body, callback);
  }

  exec(api, method, body, callback: ApiResult, headers = this.generateHeasers()) {
    let finalUrl = `${BASE_URL_LOCAL}${API_VERSION}${api}`;

    console.log(
      `Calling (${method}) ${finalUrl}\nHeaders (${JSON.stringify(
        headers
      )})\nBody${JSON.stringify(body)} `
    );

    const response = fetch(finalUrl, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          callback.onFailure(json);
        } else {
          callback.onSuccess(json);
        }
        return json.statusCode;
      })
      .catch((error) => {
        console.error(error);
        callback.onFailure({
          statusCode: error.statusCode ?? 0,
          error: {
            type: error.code ?? 0,
            description:
              error.message ?? "An error occurred. Please try again.",
          },
        });
      });
  }

  generateHeasers() {
    const appVersion = Constants.manifest.version;
    const deviceRegion = Localization.locale;
    const deviceModel = Device?.modelName ?? "model not available";

    const currentLanguage = deviceRegion;
    const apiVersion = Platform.Version;

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Lang: currentLanguage,
      "App-Version": appVersion,
      Region: deviceRegion,
      "Device-Platform": apiVersion,
      os: Platform.OS,
      "Device-Platform-Version": Device?.osVersion ?? "version not available",
      "Device-Model": deviceModel,
      "api-key": this.apiToken,
    };

    return headers;
  }
}

const NetworkApiComponent = ({ children }) => {
  const apiToken = useSelector((state) => state.apiToken);

  const networkApiObject:MainApiInterface = new MainApi(apiToken);

  const addNetworkApi = (children) => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return null;

      return cloneElement(child, {
        ...child.props,
        children: addNetworkApi(child.props.children),
        networkApi: networkApiObject,
      });
    });
  };
  return addNetworkApi(children);
};
export default NetworkApiComponent;
