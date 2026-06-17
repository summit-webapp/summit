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
  gradeChangeList: { label: string, value: string }[];
  diamondChangeList: { label: string, value: string }[];
  colorStoneChangeList: { label: string, value: string }[];
  customiseFilters: {
    metal?: { label: string; value: string | number };
    purity?: { label: string; value: string | number };
    tone?: { label: string; value: string | number };
    diamond?: { label: string; value: string | number };
    stone?: { label: string; value: string | number };
  };
  showProductCardDetails: boolean;
  selectAllProducts: boolean;
  designSizes: any[] | null,
  attributesData: any[] | null,
  companyCode: string | null,
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
  customiseFilters: {},
  currentScope: 'PDCM Design Bank',
  customer: null,
  scope: { label: 'PDCM Design Bank', value: 'PDCM Design Bank' },
  userDefaultData: null,
  userDefaultLoading: false,
  designBankCount: 0,
  gradeChangeList: [],
  diamondChangeList: [],
  colorStoneChangeList: [],
  toggleProductView: 'grid',
  showProductCardDetails: false,
  selectAllProducts: false,
  designSizes: [],
  attributesData: [],
  companyCode: null,
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

      if (!state.filters?.[customer]) state.filters[customer] = {};
      state.filters[customer][scope] = {
        ...(state.filters?.[customer]?.[scope] || {}),
        ...data,
      };
    },
    setFiltersSetOfAPI: (state, action) => {
      const { customer, scope, data } = action.payload;

      if (!state.filtersSetOfAPI?.[customer]) state.filtersSetOfAPI[customer] = {};
      state.filtersSetOfAPI[customer][scope] = {
        ...(state.filtersSetOfAPI?.[customer]?.[scope] || {}),
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
    setDesignSizes: (state, action) => {
      state.designSizes = action.payload;
    },
    setAttributesData: (state, action) => {
      state.attributesData = action.payload;
    },
    setCustomiseFilters: (state, action) => {
      const { data } = action.payload;
      state.customiseFilters = {
        ...(state.customiseFilters || {}),
        ...data,
      };
    },
    setCompanyCode: (state, action) => {
      state.companyCode = action.payload;
    },
  },
})

export const { setHideFiltersOnFirstLoad, setGridCols, setGoldRate, setPalladiumRate, setPlatinumRate, setSilverRate, setMetalRateSidebar, setPrevCSFilters, setFilters, setFiltersSetOfAPI, setCurrentScope, setCustomer, setScope, setUserDefaultData, setUserDefaultLoading, setUserDefaultSidebar, setDesignBankCount, setGradeChangeList, setDiamondChangeList, setColorStoneChangeList, setCustomiseFilters, setShowProductCardDetails, setSelectAllProducts, setToggleProductView, setDesignSizes, setAttributesData, setCompanyCode } = KCSlice.actions;
export const KCFromStore = (state: any) => state.KCSlice;
export default KCSlice.reducer;