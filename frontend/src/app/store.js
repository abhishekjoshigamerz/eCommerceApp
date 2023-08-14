import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './api/apiSlice';
import filtersSlice from './filter';
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
   
    filters: filtersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
