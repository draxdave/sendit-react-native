const baseUrl = "http://service.sendit.draxs.com/api";
const API_VERSION = "/v2";

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

  function call(api, method, body, callback: ApiResult) {
    let finalUrl = `${baseUrl}${API_VERSION}${api}`;

    console.log(`Calling (${method}) ${finalUrl}`);
    console.log(`${JSON.stringify(body)}`);

    const response = fetch(finalUrl, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // headers,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        callback.onSuccess(json);
        return json.statusCode;
      })
      .catch((error) => {
        console.error(error);
        callback.onFailure(error);
      });
  }
  
  switch (request) {
    case "signin":
      signinCall(data, callback);
      break;
    case "signup":
      break;
    case "googleSignIn":
      break;
    default:
  }
};

export default MainApi;
