import { Children, cloneElement, isValidElement } from "react";
import { API_VERSION, BASE_URL } from "../../../config";
import * as Localization from "expo-localization";
import Constants from "expo-constants";
import { Device } from "expo-device";
import { Platform } from "react-native";

type MainApiProps = {
  request:
    | "signin"
    | "signup"
    | "googleSignIn"
    | "whois"
    | "signout"
    | "getConnections"
    | "getQr"
    | "share"
    | "pairDevice" ,
  callback: ApiResult,
  data: any,
};

type ApiResult = {
  onSuccess: () => {},
  onFailure: () => {},
};

interface MainApiInterface {
  call(props: MainApiProps): void;
}

class MainApi implements MainApiInterface {
  constructor(apiToken: String = "", onUnAuthorized) {
    this.apiToken = apiToken;
    this.onUnAuthorized = onUnAuthorized;
  }
  call({ request, data, callback }) {
    switch (request) {
      case "signin":
        this.signinCall(data, callback);
        break;
      case "signup":
        break;
      case "whois":
        this.getMe(data, callback);
        break;
      case "googleSignIn":
        this.signinSsoCall(data, callback);
        break;
      case "getConnections":
        this.getConnections(data, callback);
        break;
      case "getQr":
        this.getQRUrl(data, callback);
        break;
      case "share":
        this.share(data, callback);
        break;
      case "pairDevice":
        this.pairDevice(data, callback);
        break;
      case "signout":
        this.signout(data, callback);
        break;
      default:
    }
  }

  signinCall(body, callback: ApiResult) {
    const LOGIN_API = "/user/signin";
    this.exec(LOGIN_API, "POST", body, {
      onSuccess: (json) => {
        this.apiToken = json.data.token;
        console.log("new api token:" + this.apiToken);
        callback.onSuccess(json);
      },
      onFailure: (json) => {
        callback.onFailure(json);
      },
    });
  }

  signinSsoCall(body, callback: ApiResult) {
    const targetApi = "/user/signin_sso";
    this.exec(targetApi, "POST", body, {
      onSuccess: (json) => {
        this.apiToken = json.data.token;
        console.log("new api token:" + this.apiToken);
        callback.onSuccess(json);
      },
      onFailure: (json) => {
        callback.onFailure(json);
      },
    });
  }

  pairDevice(body, callback: ApiResult) {
    const targetApi = "/device/pair";
    this.exec(targetApi, "POST", body, callback);
  }

  share(body, callback: ApiResult) {
    const targetApi = "/share";
    this.exec(targetApi, "POST", body, callback);
  }

  getMe(body, callback: ApiResult) {
    const targetApi = "/device/whois";
    this.exec(targetApi, "GET", body, callback);
  }

  getQRUrl(body, callback: ApiResult) {
    const targetApi = "/device/pair/qr";
    this.exec(targetApi, "GET", body, callback);
  }

  getConnections(body, callback: ApiResult) {
    const targetApi = "/connections";
    this.exec(targetApi, "GET", body, callback);
  }

  signout(body, callback: ApiResult) {
    const targetApi = "/device/signout";
    this.exec(targetApi, "POST", body, callback);
  }

  exec(
    api,
    method,
    body = null,
    callback: ApiResult,
    headers = this.generateHeasers()
  ) {
    let finalUrl = `${BASE_URL}${API_VERSION}${api}`;

    console.log(
      `Calling (${method}) ${finalUrl}\nHeaders (${JSON.stringify(
        headers
      )})\nBody${JSON.stringify(body)} `
    );

    const request = {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    };
    if (method === "GET" || method === "HEAD") {
      delete request.body;
    }

    const response = fetch(finalUrl, request)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.error || json.statusCode !== 200) {
          if (json.statusCode === 4013) {
            this.onUnAuthorized();
          }
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

export default MainApi;
