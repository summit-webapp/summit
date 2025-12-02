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
    userDefaultSidebar: false,
    prevCSFilters: {},
    gridCols: 4,
    goldRate: 0,
    palladiumRate: 0,
    platinumRate: 0,
    silverRate: 0,
    filters: {
      Database: { selectedScope: { label: 'New Session', value: 'Database' } },
      Stock: { selectedScope: { label: 'Stock', value: 'Stock' } },
      'Current Session': { selectedScope: { label: 'Current Session (QT/CS)', value: 'Current Session' } },
      Cart: { selectedScope: { label: 'Cart (QT/CT)', value: 'Cart' } },
      'Stock Cart': { selectedScope: { label: 'Stock Cart', value: 'Stock Cart' } },
      Voucher: { selectedScope: { label: 'Voucher', value: 'Voucher' } },
    },
    filtersSetOfAPI: {
      Database: { selectedScope: { label: 'New Session', value: 'Database' } },
      Stock: { selectedScope: { label: 'Stock', value: 'Stock' } },
      'Current Session': { selectedScope: { label: 'Current Session (QT/CS)', value: 'Current Session' } },
      Cart: { selectedScope: { label: 'Cart (QT/CT)', value: 'Cart' } },
      'Stock Cart': { selectedScope: { label: 'Stock Cart', value: 'Stock Cart' } },
      Voucher: { selectedScope: { label: 'Voucher', value: 'Voucher' } },
    },
    currentScope: 'Database',
    userDefaultData: null,
    userDefaultLoading: false,
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
    },
    setUserDefaultSidebar: (state, action) => {
      state.userDefaultSidebar = action.payload;
    },
    setPrevCSFilters: (state, action) => {
      state.prevCSFilters = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setFiltersSetOfAPI: (state, action) => {
      state.filtersSetOfAPI = action.payload;
    },
    setCurrentScope: (state, action) => {
      state.currentScope = action.payload;
    },
    setUserDefaultData: (state, action) => {
      state.userDefaultData = action.payload;
    },
    setUserDefaultLoading: (state, action) => {
      state.userDefaultLoading = action.payload;
    },
  },
})

export const { setHideFiltersOnFirstLoad, setGridCols, setGoldRate, setPalladiumRate, setPlatinumRate, setSilverRate, setMetalRateSidebar, setPrevCSFilters, setFilters, setFiltersSetOfAPI, setCurrentScope,  setUserDefaultData, setUserDefaultLoading, setUserDefaultSidebar } = KCSlice.actions;
export const KCFromStore = (state: any) => state.KCSlice;
export default KCSlice.reducer;