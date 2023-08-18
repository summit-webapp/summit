import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getBrandsList from "../../../services/api/home_page_api/home-brand-api";
import { RootState } from "../../root-reducer";
import getLoginApi from "../../../services/api/auth/login_api";
import getGoogleLoginApi from "../../../services/api/auth/google_login_api";
import LogoutList from "../../../services/api/auth/logout_api";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../general_slices/toast_notification_slice";
import UserRoleGet from "../../../services/api/auth/get_userrole_api";
import { updateAccessToken } from "./token-login-slice";

interface RepoLoginThunk {
  request: any;
  isGoogleLogin: boolean;
  visitor: boolean;
  isOtpLogin: boolean;
}
export const fetchLoginUser: any = createAsyncThunk(
  "login/fetchLoginUser",
  async (request: any, { dispatch }) => {
    console.log(request, "kkk");
    let userLogin: any;
    if (request.isGoogleLogin === true) {
      userLogin = await getGoogleLoginApi(request);
      if (userLogin.data.message.msg === "success") {
        dispatch(successmsg("logged in sucessfully"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 1200);
      } else {
        dispatch(failmsg("Invalid Credential"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 1500);
      }
    } else if (request.isOtpLogin === true) {
      userLogin = await getGoogleLoginApi(request);
      if (userLogin.data.message.msg === "success") {
        console.log("otp login dispatch");
        dispatch(successmsg("logged in sucessfully"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 1200);
      } else {
        dispatch(failmsg("Invalid Credential"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 1500);
      }
    } else if (request.Logouts === true) {
      userLogin = await LogoutList();
    } else {
      userLogin = await getLoginApi(request);
      // const get_user_role = await UserRoleGet();

      if (userLogin?.data?.message === "Logged In") {
        console.log("login dispatch", userLogin);
        dispatch(successmsg("logged in sucessfully"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 800);
        localStorage.removeItem("guest");
      } else {
        dispatch(failmsg("Invalid Credential"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 1500);
      }
    }
    console.log(userLogin, "userLogin");
    return userLogin;
  }
);

interface RepoLoginState {
  user: any;
  error: any;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoLoginState = {
  user: {},
  error: "",
  isLoading: "idle",
};

export const LoginScreen = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateFetchLoginUser(state: any, action: any) {
      console.log("guest update login slice", action?.payload);
      localStorage.setItem("isLoggedIn", "true");
      state.isLoading = "succeeded";
      state.user = "LoggedIn";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.isLoading = "pending";
      state.user = "";
      state.error = "";
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      console.log(" slice success12", action.payload);
      if (action.payload !== undefined) {
        if (
          action?.payload?.status === 200 &&
          action?.payload?.data?.message === "Logged In"
        ) {
          localStorage.setItem("isLoggedIn", "true");
          state.isLoading = "succeeded";
          state.user = "LoggedIn";
          state.error = "";
        } else {
          state.isLoading = "failed";
          state.user = "";
          state.error = "Invalid Login Credentital";
        }
      } else {
        state.isLoading = "succeeded";
        state.user = "";
        state.error = "";
      }
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.isLoading = "failed";
      state.user = "";
      state.error = "Invalid Login Credentital";
    });
  },
});

export const login_state = (state: RootState) => state.LoginScreen;
export const { updateFetchLoginUser }: any = LoginScreen.actions;

export default LoginScreen.reducer;
