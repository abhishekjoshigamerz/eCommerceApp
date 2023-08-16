import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './api/apiSlice';
import filtersSlice from './filter';
import cartSlice from './cart';
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
   
    filters: filtersSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
