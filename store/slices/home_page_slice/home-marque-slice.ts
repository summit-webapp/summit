import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';
import { fetchHomeMarqueAPI } from '../../../services/api/home_page_api/home-marque-api';

export const fetchHomeMarque: any = createAsyncThunk(
    'fetchHomeMarque',
    async () => {

        const HomeMarqueData = await fetchHomeMarqueAPI();
        console.log("display tags slice", HomeMarqueData);
        return HomeMarqueData;
    }
);
interface RepoMarque {
    data: any;
    error: string;
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoMarque = {
    data: [],
    error: '',
    isLoading: 'idle',
};

export const HomeMarque = createSlice({
    name: 'HomeMarque',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchHomeMarque.pending, (state) => {
            state.isLoading = 'pending';
            state.error = '';
        });
        builder.addCase(fetchHomeMarque.fulfilled, (state, action) => {
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

        builder.addCase(fetchHomeMarque.rejected, (state) => {
            state.isLoading = 'failed';
            state.data = [];
            state.error = 'Unable to load marque';
        });
    },
});


export const home_marque_from_store = (state: RootState) => state.HomeMarque;

export default HomeMarque.reducer;
