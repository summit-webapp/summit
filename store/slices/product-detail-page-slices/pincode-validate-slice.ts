import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getStockAvailability from '../../../services/api/product-detail-page-api/product-stock-availability-api';
import { RootState } from '../../root-reducer';
import getProductSpecification from '../../../services/api/product-detail-page-api/product-specification-api';
import getPincodeApi from '../../../services/api/product-detail-page-api/pincode-validate-api';

export const fetchPincodeServiceableArea: any = createAsyncThunk(
  'productSpecification/fetchPincodeServiceableArea',
  async (params) => {
    const { pincode}: any = params;
    console.log('pincode in slice',pincode)
    const respnse = await getPincodeApi(pincode);
    return respnse;
  }
);

interface RepoStockState {
  data: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoStockState = {
  data: [],
  error: '',
  isLoading: 'idle',
};

export const ValidatePincodeScreen = createSlice({
  name: 'validatePincode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPincodeServiceableArea.pending, (state) => {
      state.isLoading = 'pending';
      state.data = [];
    });
    builder.addCase(fetchPincodeServiceableArea.fulfilled, (state, action) => {
      {
        if (
          action?.payload?.status === 200 &&
          action?.payload?.data?.hasOwnProperty('message')
        ) {
          state.isLoading = 'succeeded';
          state.data = action.payload.data.message.data;
        } else {
          state.isLoading = 'succeeded';
          state.error = '';
          state.data = [];
        }
      }
    });

    builder.addCase(fetchPincodeServiceableArea.rejected, (state) => {
      state.isLoading = 'failed';
      state.data = [];
      state.error = 'Unable to load addresses';
    });
  },
});

export const validate_pincode_state = (state: RootState) =>
  state.validatePincode;

export default ValidatePincodeScreen.reducer;
