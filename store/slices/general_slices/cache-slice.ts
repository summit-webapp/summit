import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
const initialState = {
  cacheData: {},
};
const cacheSlice = createSlice({
  name: "cache-slice",
  initialState,
  reducers: {
    setRevalidationTime(state, action) {
      //   console.log("validation time", action);
      state.cacheData = action.payload;
    },
  },
});
export const { setRevalidationTime } = cacheSlice.actions;
export const cache_data_state = (state: RootState) => state.CacheScreen;
export default cacheSlice.reducer;