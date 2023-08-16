import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
    },

    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload.id);
    },
    clearCart: (state) => {
        state.items = [];
    },
    increaseItemQuantity: (state,action)=>{
      state.items = state.items.map(item => {
        if (item._id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    },
    decreaseItemQuantity: (state,action)=>{

      state.items = state.items.map(item => {
        if (item._id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

    },

    // Add other actions if needed, e.g., removeItemFromCart, clearCart, etc.
  },
});

export const { addItemToCart,removeItemFromCart,clearCart,increaseItemQuantity,decreaseItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
