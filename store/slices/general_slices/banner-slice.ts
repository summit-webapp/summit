import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBannerApi } from '../../../services/api/general_apis/banner-api';
import { RootState } from '../../root-reducer';

export const fetchBanner: any = createAsyncThunk(
    'fetchBanner',
    async (category) => {
        console.log("bannerrr", category)
        const response = await fetchBannerApi(category);
        console.log("bannerrr", response)
        return response;
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

export const Banner = createSlice({
    name: 'Banner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBanner.pending, (state) => {
            state.isLoading = 'pending';
            state.data = [];
        });
        builder.addCase(fetchBanner.fulfilled, (state, action) => {
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

        builder.addCase(fetchBanner.rejected, (state) => {
            state.isLoading = 'failed';
            state.data = [];
            state.error = 'Unable to load banner';
        });
    },
});

export const banner_from_store = (state: RootState) =>
    state.Banner;

export default Banner.reducer;
