import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";
import {
  AddProductToWishlist,
  DeleteProductfromWishlist,
  GetWishlistData,
} from "../../../services/api/wishlist-page-api/wishlist-api";
import {
  successmsg,
  failmsg,
  hideToast,
} from "../general_slices/toast_notification_slice";
import { showToast } from "../../../components/ToastNotificationNew";

export const fetchWishlistUser: any = createAsyncThunk(
  "wishlist/fetchWishlistUser",
  async (request: any, { dispatch }) => {
    console.log(request, "kkk");
    let userWishList: any;
    if (request.addTowishlist === true) {
      userWishList = await AddProductToWishlist(request);
      if (userWishList.msg === "success") {
        // dispatch(successmsg("item added to wishlist"));
        // setTimeout(() => {
        //   dispatch(hideToast());
        // }, 500);
        showToast("item added to wishlist", "success");
      } else {
        showToast("Failed to add item in wishlist", "error");
        // dispatch(failmsg("Error in adding item in wishlist"));
        // setTimeout(() => {
        //   dispatch(hideToast());
        // }, 500);
      }
      console.log(userWishList, "userWishList");
    } else if (request.getWishlist === true) {
      userWishList = await GetWishlistData(request);
    } else if (request.deleteWishlist === true) {
      userWishList = await DeleteProductfromWishlist(request);
      if (userWishList.msg === "success") {
        dispatch(failmsg(userWishList.data));
        setTimeout(() => {
          dispatch(hideToast());
        }, 700);
      } else {
        dispatch(failmsg("Error in deleting item from wishlist"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 700);
      }
      console.log(userWishList.data, "userWishList");
    } else {
      return null;
    }
    return userWishList;
  }
);

interface RepoWishlistState {
  user: any;
  error: any;
  // wishProduct: any,
  isLoading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: RepoWishlistState = {
  user: [],
  error: "",
  isLoading: "idle",
  // wishProduct: [0],
};

export const WishlistScreen = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistUser.pending, (state) => {
      state.isLoading = "pending";
      state.user = [];
      state.error = "";
    });
    builder.addCase(fetchWishlistUser.fulfilled, (state, action) => {
      console.log(" slice success12", action);
      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.msg === "success"
      ) {
        state.user = action?.payload?.data?.message;
        state.error = "";
        state.isLoading = "succeeded";
      } else {
        state.isLoading = "succeeded";
        state.user = "";
        state.error = "Product is not added in wishlist";
      }
    });
    builder.addCase(fetchWishlistUser.rejected, (state, action) => {
      state.isLoading = "failed";
      state.user = "";
      state.error = "Product fail to add in wishlist";
    });
  },
});

export const wishlist_state = (state: RootState) => state.WishlistScreen;

export default WishlistScreen.reducer;
