// store/categoryBreadcrumbSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BreadcrumbState {
  level: "top" | "sub" | "subsub";
  selectedCategory: any;
  selectedSubCategory: any;
  selectedSubSubCategory: any;
}

const initialState: BreadcrumbState = {
  level: "top",
  selectedCategory: null,
  selectedSubCategory: null,
  selectedSubSubCategory: null,
};

export const categoryBreadcrumbSlice = createSlice({
  name: "categoryBreadcrumb",
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<"top" | "sub" | "subsub">) => {
      state.level = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<any>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubCategory: (state, action: PayloadAction<any>) => {
      state.selectedSubCategory = action.payload;
    },
    setSelectedSubSubCategory: (state, action: PayloadAction<any>) => {
      state.selectedSubSubCategory = action.payload;
    },
    resetBreadcrumb: (state) => {
      state.level = "top";
      state.selectedCategory = null;
      state.selectedSubCategory = null;
      state.selectedSubSubCategory = null;
    },
  },
});

export const {
  setLevel,
  setSelectedCategory,
  setSelectedSubCategory,
  setSelectedSubSubCategory,
  resetBreadcrumb,
} = categoryBreadcrumbSlice.actions;

export default categoryBreadcrumbSlice.reducer;
