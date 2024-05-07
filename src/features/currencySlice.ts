import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  selectedCurrency: string;
}

const initialState: CurrencyState = {
  selectedCurrency: localStorage.getItem('selectedCurrency') || 'USD',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    selectCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
      localStorage.setItem('selectedCurrency', action.payload);
    },
  },
});

export const { selectCurrency } = currencySlice.actions;

export default currencySlice.reducer;
