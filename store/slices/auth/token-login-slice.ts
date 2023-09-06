import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getTokenLoginApi from "../../../services/api/auth/token-login-api";
import { showToast } from "../../../components/ToastNotificationNew";

export const getAccessToken: any = createAsyncThunk(
  "accessToken/getAccessToken",
  async (param: any, { dispatch }) => {
    const AccessTokenData = await getTokenLoginApi(param);
    console.log(AccessTokenData, "AccessTokenData");

    if (AccessTokenData?.data?.hasOwnProperty("access_token")) {
      localStorage.setItem("isLoggedIn", "true");

      setTimeout(() => {
        showToast("logged in sucessfully", "success");
      }, 1200);
    } else {
      showToast("Invalid Credential", "error");
    }
    return AccessTokenData;
  }
);
interface RepoAccessTokenState {
  token: any;
  error: string;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoAccessTokenState = {
  token: "",
  error: "",
  isLoading: "idle",
};

export const GetAccessTokenScreen = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    ClearToken(state?: any, action?: any) {
      state.token = "";
      state.error = "";
      state.isLoading = "idle";
    },
    updateAccessToken(state?: any, action?: any) {
      console.log("new access token payload", action.payload);
      state.token = action?.payload?.data;
      state.error = "";
      state.isLoading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccessToken.pending, (state) => {
      state.isLoading = "pending";
      state.token = "";
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      console.log("token payload", action?.payload);
      if (action?.payload?.data?.hasOwnProperty("access_token")) {
        state.token = action?.payload?.data?.access_token;
        state.isLoading = "succeeded";
      }
    });
    builder.addCase(getAccessToken.rejected, (state, action) => {
      state.isLoading = "failed";
      state.token = "";
      state.error = "failed to store token";
    });
  },
});

export const get_access_token = (state: RootState) =>
  state.GetAccessTokenScreen;
export const { ClearToken, updateAccessToken }: any =
  GetAccessTokenScreen.actions;

export default GetAccessTokenScreen.reducer;
