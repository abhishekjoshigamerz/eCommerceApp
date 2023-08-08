import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './api/apiSlice';
import productSlice from './productSlice';
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    products: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
