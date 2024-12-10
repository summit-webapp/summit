import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

interface ComponentFieldTypes {
  name: string;
  component: string;
  component_name: string;
  page_name: string;
  section_name: string;
  image: string;
}

interface ComponentTypes {
  componentsList: ComponentFieldTypes[];
}

const initialState: ComponentTypes = {
  componentsList: [],
};

const componentsListSlice = createSlice({
  name: 'components-list',
  initialState,
  reducers: {
    createComponentsList: (state, action) => {
      state.componentsList = action?.payload;
    },
  },
});

export const { createComponentsList } = componentsListSlice.actions;

export const componentsListFromReduxStore = (state: RootState) => state.ComponentsScreen;

export default componentsListSlice.reducer;
