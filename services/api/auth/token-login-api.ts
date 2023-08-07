import axios from "axios";
import { CONSTANTS } from "../../config/app-config";

const getTokenLoginApi: any = async (values: any) => {
  const usr = values.email;
  const pwd = values.password;
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_access_token";
  const entity = "access_token";
  const params = `?version=${version}&method=${method}&entity=${entity}&usr=${usr}&pwd=${pwd}`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  console.log("tokennn", token);
  const config = {
    headers: {
      Accept: "application/json",
    },
    // withCredentials: true
  };
  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}${params}`,
      undefined,
      config
    )
    .then((res) => {
      console.log("@@token login", res);
      response = res?.data?.message;
      // localStorage.setItem("token", response.access_token);
    })
    .catch((err) => console.log(err));
  return response;
};

export default getTokenLoginApi;
