import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../root-reducer";

const initialState = {
  view: "",
};

const ProductListingViewSlice = createSlice({
  name: "product-view-slice",
  initialState,
  reducers: {
    setProductsView(state, action) {
      console.log("toggleProductListView payload",action.payload)
      state.view = action.payload;
    },
  },
});

export const { setProductsView } = ProductListingViewSlice.actions;

export const products_view_state = (state:RootState)=>
state.ProductsViewScreen

export default ProductListingViewSlice.reducer;