import { API_VERSION, BASE_URL_LOCAL, BASE_URL_PRD } from "../../../config";
import * as Localization from 'expo-localization';
import Constants from 'expo-constants';
import { Device } from 'expo-device';
import { Platform } from 'react-native';

type MainApiProps = {
  request: "signin" | "signup" | "googleSignIn",
  callback: ApiResult,
  data: any,
};

type ApiResult = {
  onSuccess: () => {},
  onFailure: () => {},
};

const MainApi: FunctionComponent<MainApiProps> = ({
  request,
  data,
  callback,
}) => {
  function signinCall(body, callback: ApiResult) {
    const LOGIN_API = "/user/signin";
    call(LOGIN_API, "POST", body, callback);
  }

  function signinSsoCall(body, callback: ApiResult) {
    const targetApi = "/user/signin_sso";
    call(targetApi, "POST", body, callback);
  }

  function call(api, method, body, callback: ApiResult, headers=generateHeasers()) {
    let finalUrl = `${BASE_URL_LOCAL}${API_VERSION}${api}`;

    console.log(`Calling (${method}) ${finalUrl}\nHeaders (${JSON.stringify(headers)})\nBody${JSON.stringify(body)} `);
   
    const response = fetch(finalUrl, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          callback.onFailure(json)
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
            description: error.message ?? "An error occurred. Please try again."
          }
        });
      });
  }

  function generateHeasers() {
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
      "os": Platform.OS,
      "Device-Platform-Version": Device?.osVersion ?? "version not available",
      "Device-Model": deviceModel,
    };

    return headers;
  }

  switch (request) {
    case "signin":
      signinCall(data, callback);
      break;
    case "signup":
      break;
    case "googleSignIn":
      signinSsoCall(data, callback);
      break;
    default:
  }
};

export default MainApi;
