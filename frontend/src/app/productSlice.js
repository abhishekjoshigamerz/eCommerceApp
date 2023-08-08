import { createSlice } from "@reduxjs/toolkit";

export const productStore = createSlice({
    name: "products",
    initialState: {
        products: {},
    },
    reducers: {
        setproductsData: (state, action) => {

          const { courseID, courseName, coursePrice, courseImage } = action.payload;
            
            state.products[courseID] = {
                courseName: courseName,
                coursePrice: coursePrice,
                courseImage: courseImage,
                id: courseID,
            };    
        },
        removeproductsData:(state, action)=>{
            const id  = action.payload;
            delete state.products[id];
        },
        clearproducts: (state) => {
            state.products = {};
        }
    }
});

export const { setproductsData, removeproductsData, clearproducts } = productStore.actions;

export default productStore.reducer;