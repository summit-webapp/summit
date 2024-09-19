import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

interface CatalogState {
  catalogList: any[];
}

const initialState: CatalogState = {
  catalogList: [],
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCatalogListSlice: (state, action: PayloadAction<any[]>) => {
      state.catalogList = action.payload;
    },
    addCatalogItem: (state, action: PayloadAction<any>) => {
      state.catalogList.push(action.payload);
    },
    removeCatalogItem: (state, action: PayloadAction<string>) => {
      state.catalogList = state.catalogList.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setCatalogListSlice, addCatalogItem, removeCatalogItem } = catalogSlice.actions;

export const selectCatalogList = (state: RootState) => state.catalogSlice;

export default catalogSlice.reducer;
