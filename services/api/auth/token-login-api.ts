import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import getLoginApi from "./login_api";
import CheckGuestLogin from "./guest-login-api";
import { useDispatch } from "react-redux";

const getTokenLoginApi: any = async (values: any) => {
  // const dispatch = useDispatch();
  console.log("token req", values);
  const usr = values.values.email;
  const pwd = values.values.password;
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_access_token";
  const entity = "access_token";
  const params = `?version=${version}&method=${method}&entity=${entity}&usr=${usr}&pwd=${pwd}`;

  const config = {
    headers: {
      Accept: "application/json",
    },
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
      if (values?.guest !== null) {
        localStorage.setItem("guestToken", response.access_token);
      }
    })

    .then(() => {
      if (values?.guest !== null) {
        console.log("token guest values", values);
        CheckGuestLogin(values);
        // dispatch(fetchLoginUser());
      } else {
        console.log("token else");
        getLoginApi(values);
      }
    })
    .catch((err) => console.log(err));
  return response;
};

export default getTokenLoginApi;
