import { createSlice } from "@reduxjs/toolkit";

interface FiltersState {
  currentScope: string;
  scope: any;
  customer: any;
  filters: { [customer: string]: { [scope: string]: any } };
  filtersSetOfAPI: { [customer: string]: { [scope: string]: any } };
  toggleProductView: 'grid' | 'list';
  hideFiltersOnFirstLoad: boolean;
  metalRateSidebar: boolean;
  userDefaultSidebar: boolean;
  prevCSFilters: any;
  gridCols: number;
  goldRate: number;
  palladiumRate: number;
  platinumRate: number;
  silverRate: number;
  userDefaultData: any;
  userDefaultLoading: boolean;
  designBankCount: number;
  gradeChangeList: {label: string, value: string}[];
  diamondChangeList: {label: string, value: string}[];
  colorStoneChangeList: {label: string, value: string}[];
  showProductCardDetails: boolean;
  selectAllProducts: boolean;
}

const initialState: FiltersState = {
  hideFiltersOnFirstLoad: true,
  metalRateSidebar: false,
  userDefaultSidebar: false,
  prevCSFilters: {},
  gridCols: 4,
  goldRate: 0,
  palladiumRate: 0,
  platinumRate: 0,
  silverRate: 0,
  filters: {},
  filtersSetOfAPI: {},
  currentScope: 'Database',
  customer: null,
  scope: { label: 'New Session (PDCM Design Bank)', value: 'Database' },
  userDefaultData: null,
  userDefaultLoading: false,
  designBankCount: 0,
  gradeChangeList: [],
  diamondChangeList: [],
  colorStoneChangeList: [],
  toggleProductView: 'grid',
  showProductCardDetails: false,
  selectAllProducts: false,
};

export const KCSlice = createSlice({
  name: "KC",
  initialState,
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
    setCurrentScope: (state, action) => {
      state.currentScope = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setScope: (state, action) => {
      state.scope = action.payload;
    },
    setFilters: (state, action) => {
      const { customer, scope, data } = action.payload;

      if (!state.filters[customer]) state.filters[customer] = {};
      state.filters[customer][scope] = {
        ...(state.filters[customer][scope] || {}),
        ...data,
      };
    },
    setFiltersSetOfAPI: (state, action) => {
      const { customer, scope, data } = action.payload;

      if (!state.filtersSetOfAPI[customer]) state.filtersSetOfAPI[customer] = {};
      state.filtersSetOfAPI[customer][scope] = {
        ...(state.filtersSetOfAPI[customer][scope] || {}),
        ...data,
      };
    },
    setUserDefaultData: (state, action) => {
      state.userDefaultData = action.payload;
    },
    setUserDefaultLoading: (state, action) => {
      state.userDefaultLoading = action.payload;
    },
    setDesignBankCount: (state, action) => {
      state.designBankCount = action.payload;
    },
    setGradeChangeList: (state, action) => {
      state.gradeChangeList = action.payload;
    },
    setDiamondChangeList: (state, action) => {
      state.diamondChangeList = action.payload;
    },
    setColorStoneChangeList: (state, action) => {
      state.colorStoneChangeList = action.payload;
    },
    setToggleProductView: (state, action) => {
      state.toggleProductView = action.payload;
    },
    setShowProductCardDetails: (state, action) => {
      state.showProductCardDetails = action.payload;
    },
    setSelectAllProducts: (state, action) => {
      state.selectAllProducts = action.payload;
    },
  },
})

export const { setHideFiltersOnFirstLoad, setGridCols, setGoldRate, setPalladiumRate, setPlatinumRate, setSilverRate, setMetalRateSidebar, setPrevCSFilters, setFilters, setFiltersSetOfAPI, setCurrentScope, setCustomer, setScope, setUserDefaultData, setUserDefaultLoading, setUserDefaultSidebar, setDesignBankCount, setGradeChangeList, setDiamondChangeList, setColorStoneChangeList, setShowProductCardDetails, setSelectAllProducts, setToggleProductView } = KCSlice.actions;
export const KCFromStore = (state: any) => state.KCSlice;
export default KCSlice.reducer;