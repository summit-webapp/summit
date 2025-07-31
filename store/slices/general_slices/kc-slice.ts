import { createSlice } from "@reduxjs/toolkit";

export const KCSlice = createSlice({
  name: "KC",
  initialState: {
    // selectedProducts: [],
    // hideSelectAllBtn: false,
    hideFiltersOnFirstLoad: true,
    // actionBtnLoader: false,
    // activeScope: "Current Session",
    // selectedCustomerCode: { value: "", label: "" },
    // voucherNo: "",
  },
  reducers: {
    setHideFiltersOnFirstLoad: (state, action) => {
      state.hideFiltersOnFirstLoad = action.payload;
    },
  },
})

export const { setHideFiltersOnFirstLoad } = KCSlice.actions;
export const KCFromStore = (state: any) => state.KCSlice;
export default KCSlice.reducer;