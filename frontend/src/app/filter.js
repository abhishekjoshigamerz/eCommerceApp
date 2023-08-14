// filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategories: [], // Store selected categories
  minPrice: 0, // Store minimum price
  maxPrice: 9999999, // Store maximum price
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.selectedCategories = [];
    },
    resetAllData: (state) => {
      state.selectedCategories = [];
      state.minPrice = 0;
      state.maxPrice = 9999999;
    }
  },
});

export const { setSelectedCategories, setPriceRange, resetAllData } = filtersSlice.actions;
export default filtersSlice.reducer;
