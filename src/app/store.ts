import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/productsApi";
import cartReducer from "../features/cartSlice";
import currencyReducer from "../features/currencySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;