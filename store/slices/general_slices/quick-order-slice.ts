import {
  createAsyncThunk,
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import getQuickOrder from "../../../services/api/general_apis/quick-order-api";

export const fetchQuickOrder: any = createAsyncThunk(
  "quickOrder/fetchQuickOrder",
  async (request: any) => {
    const QuickOrderData = await getQuickOrder(request);
    // console.log("uick order", QuickOrderData);
    return QuickOrderData;
  }
);

interface RepofetchQuickOrderState {
  items: any;
  error: string;
  itemList: any;
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepofetchQuickOrderState = {
  items: [],
  error: "",
  itemList: [],
  isLoading: "idle",
};

export const QuickOrderScreen = createSlice({
  name: "quickOrder",
  initialState,
  reducers: {
    removeSingleItem(state?:any, action?:any)
    {
      // console.log('single item remove from quick order', action);
      state.items = [...action.payload];
      state.isLoading = "succeeded";
      state.itemList = [];
      state.error = ""
    },
    clearAllDataAddedToQuickOrderList(state?: any, action?: any) {
      state.items = [];
      state.error = "";
      state.isLoading = "idle";
      state.itemList = [];

    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuickOrder.pending, (state) => {
      state.isLoading = "pending";
      state.items = [...state.items];
      state.itemList = []
    });
    builder.addCase(fetchQuickOrder.fulfilled, (state, action) => {
      // console.log("uick order", action.payload);
      if (action.payload.status === 200) {
        state.isLoading = "succeeded";
        state.items = [...state.items, ...action?.payload?.data?.message?.data];
        state.itemList = action?.payload?.data?.message?.data
        state.error = "";
        // console.log("uick order data slice items", state.items);
      } else {
        state.isLoading = "failed";
        state.items = [...state.items];
        state.itemList = []
        state.error = "please enter valid HSN code";
      }
    });
    builder.addCase(fetchQuickOrder.rejected, (state, action) => {
      state.isLoading = "failed";
      state.items = [...state.items];
      state.itemList = [];
      state.error = "items not found";
    });
  },
});

export const quick_order_state = (state: RootState) => state.QuickOrderScreen;

export const { removeSingleItem,clearAllDataAddedToQuickOrderList }: any = QuickOrderScreen.actions;
export default QuickOrderScreen.reducer;
