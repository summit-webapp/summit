import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";

const initialState = {
  msg: "",
  bgColor: "",
  show: false,
  data: "",
};

export const notificationsSlice = createSlice({
  name: "notifications",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    successmsg: (state, action) => {
      console.log(action.payload, "payload toast");

      state.data = action?.payload;
      state.bgColor = "green";
      state.show = true;
    },
    failmsg: (state, action) => {
      console.log(action.payload, "payload toast");

      state.data = action?.payload;
      state.bgColor = "red";
      state.show = true;
    },
    hideToast: (state) => {
      state.show = false;
      state.data = "";
      state.bgColor = "";
    },
  },
});
export const notiifcationBar = (state: RootState) => state.notifications;
export const { successmsg, failmsg, hideToast } = notificationsSlice.actions;
export default notificationsSlice.reducer;
