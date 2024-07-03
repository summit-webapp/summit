import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';
import { GetWarrantySerialNoListAPI } from '../../../services/api/warranty-check-api/get-serial-no-list-api';

export const WarrantySerialNoList = createAsyncThunk('WarrantySerialNoList', async (item_code: any) => {
  const getSerialListData = await GetWarrantySerialNoListAPI(item_code);
  console.log('serial', getSerialListData);
  return getSerialListData;
});

interface WarrantySerialListData {
  data: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  data: [],
  error: '',
  isLoading: 'idle',
} as WarrantySerialListData;

const WarrantySerialNoListSlice = createSlice({
  name: 'WarrantySerailNoListSlice',
  initialState,
  reducers: {
    ClearWarrantyList(state?: any, action?: any) {
      console.log('clear serial warranty');
      state.data = [];
      state.error = '';
      state.isLoading = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(WarrantySerialNoList.pending, (state, action) => {
      state.data = {};
      state.isLoading = 'pending';
    });
    builder.addCase(WarrantySerialNoList.fulfilled, (state, action) => {
      console.log('serial list payload', action.payload.data);
      state.isLoading = 'succeeded';
      state.data = action?.payload?.data?.message?.data;
    });
    builder.addCase(WarrantySerialNoList.rejected, (state, action) => {
      state.isLoading = 'failed';
      state.data = [];
    });
  },
});

export const warranty_serial_list_from_store = (state: RootState) => state.WarrantySerialNoListSlice;
export const { ClearWarrantyList }: any = WarrantySerialNoListSlice.actions;

export default WarrantySerialNoListSlice.reducer;
