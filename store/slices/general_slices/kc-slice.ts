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
    metalRateSidebar: false,
    gridCols: 4,
    goldRate: 0,
    palladiumRate: 0,
    platinumRate: 0,
    silverRate: 0,
  },
  reducers: {
    setHideFiltersOnFirstLoad: (state, action) => {
      state.hideFiltersOnFirstLoad = action.payload;
    },
    setGridCols: (state, action) => {
      state.gridCols = action.payload;
    },
    setGoldRate: (state, action) => {
      state.goldRate = action.payload;
    },
    setPalladiumRate: (state, action) => {
      state.palladiumRate = action.payload;
    },
    setPlatinumRate: (state, action) => {
      state.platinumRate = action.payload;
    },
    setSilverRate: (state, action) => {
      state.silverRate = action.payload;
    },
    setMetalRateSidebar: (state, action) => {
      state.metalRateSidebar = action.payload;
    }
  },
})

export const { setHideFiltersOnFirstLoad, setGridCols, setGoldRate, setPalladiumRate, setPlatinumRate, setSilverRate, setMetalRateSidebar } = KCSlice.actions;
export const KCFromStore = (state: any) => state.KCSlice;
export default KCSlice.reducer;