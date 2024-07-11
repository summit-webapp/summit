import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getHomeTopCategoriesList from '../../../services/api/home_page_api/home-top-categories-api';
import { RootState } from '../../root-reducer';

export const fetchHomeTopCategoriesDataFromAPI = createAsyncThunk('home-top-categories-slice/fetchHomeTopCategoriesDataStatus', async (token: any) => {
  const getHomeTopCategoriesDataAPIResponse: any = await getHomeTopCategoriesList(token);
  // console.log(
  //   "home top categories data in slice",
  //   getHomeTopCategoriesDataAPIResponse
  // );
  return getHomeTopCategoriesDataAPIResponse;
});

interface HomeTopCategoriesInterface {
  homeTopCategoriesData: any;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  homeTopCategoriesData: [],
  loading: 'idle',
} as HomeTopCategoriesInterface;

export const homeTopCategoriesSlice = createSlice({
  name: 'home-top-categories',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeTopCategoriesDataFromAPI.pending, (state, action) => {
      console.log('top categories in slice pending');
      state.loading = 'pending';
      state.homeTopCategoriesData = [];
    });
    builder.addCase(fetchHomeTopCategoriesDataFromAPI.fulfilled, (state, action) => {
      console.log('top categories in slice success', action);
      if (action.payload.status === 200 && action.payload.data.message.length > 0) {
        state.loading = 'succeeded';
        state.homeTopCategoriesData = action.payload.data.message;
      } else {
        state.loading = 'failed';
        state.homeTopCategoriesData = [];
      }
    });
    builder.addCase(fetchHomeTopCategoriesDataFromAPI.rejected, (state, action) => {
      console.log('top categories in slice fail');
      state.loading = 'failed';
      state.homeTopCategoriesData = [];
    });
  },
});

export const home_top_categories_selector_state = (state: RootState) => state.HomeTopCategoriesScreen;

export default homeTopCategoriesSlice.reducer;
