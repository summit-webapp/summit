import axios from "axios";
import { CONSTANTS } from "../../config/app-config";
import getLoginApi from "./login_api";
import CheckGuestLogin from "./guest-login-api";

import UserRoleGet from "./get_userrole_api";
import OtpLoginApi from "./otp-login-api";

const getTokenLoginApi: any = async (values: any) => {
  // const dispatch = useDispatch();
  console.log("token req", values);
  const usr = values.values.email;
  const pwd = encodeURIComponent(values.values.password);

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

  if (values.isOtpLogin === false) {
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
        UserRoleGet(res?.data?.message?.data?.access_token);
      })

      .then(() => {
        if (values?.guest !== null) {
          console.log("token guest values", values);
          CheckGuestLogin(values);

          // dispatch(fetchLoginUser());
        } else {
          console.log("token else");
          // getLoginApi(values);
        }
      })
      .catch((err) => console.log(err));
    return response;
  } else {
    const OtpLoginFunction: any = OtpLoginApi(values);
    return OtpLoginFunction;
  }
};

export default getTokenLoginApi;
