import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types/Product';

interface InitialState {
  items: Product[];
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  items: [],
  loading: true,
  error: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(productsFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      }),
      builder.addCase(productsFetch.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch products';
      });
  },
});

export const productsFetch = createAsyncThunk(
  'products/productsFetch',
  async () => {
    const response = await axios.get(
      'https://onlineshopapi-production.up.railway.app/products',
    );

    return response?.data;
  },
);

export default productsSlice.reducer;
