import { apiSlice } from "../../app/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            query: (email) => ({
                url: `products`,
                method: 'GET'
            })
        }),
       


    }),
    
});


export const {
    useFetchProductsQuery,
} = productsApiSlice;




