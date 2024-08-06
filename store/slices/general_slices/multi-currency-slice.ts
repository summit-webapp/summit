import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';
import { getMultiCurrencyValue } from '../../../services/api/general-apis/default-currency-api';

export const MultiCurrencyThunk = createAsyncThunk('multi-currency-slice/fetchMultiCurrency', async (token: any) => {
  const getDefaultCurrencyValueFromAPI = await getMultiCurrencyValue();
  // console.log('multi currency in thunk', getDefaultCurrencyValueFromAPI);
  return getDefaultCurrencyValueFromAPI;
});
interface DefaultCurrencyState {
  default_currency_value: string;
  selected_currency_value: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  default_currency_value: '',
  selected_currency_value: '',
  loading: 'idle',
} as DefaultCurrencyState;

const MultiCurrencySlice = createSlice({
  name: 'currency-slice',
  initialState,
  reducers: {
    setDefaultCurrencyValue(state, action) {
      // console.log('multi currency in reducer default slice', action);
      if (Object.keys(action.payload).length > 0) {
        state.loading = 'succeeded';
        state.default_currency_value = action.payload.default_currency;
        state.selected_currency_value = action.payload.default_currency;
      } else {
        state.loading = 'succeeded';
        state.default_currency_value = 'INR';
        state.selected_currency_value = 'INR';
      }
    },
    setCurrencyValue(state, action) {
      // console.log('multi currency in reducer', action.payload);
      state.selected_currency_value = action.payload;
    },
  },
});

export const { setDefaultCurrencyValue, setCurrencyValue } = MultiCurrencySlice.actions;

export const currency_selector_state = (state: RootState) => state.CurrencyScreen;

export default MultiCurrencySlice.reducer;
