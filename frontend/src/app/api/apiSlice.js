// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
   endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'product', // Change this to match your API endpoint for fetching products
    }),
    getCategory: builder.query({
      query: () => 'categories', // Change this to match your API endpoint for fetching products
    }),
   
    filterProducts: builder.mutation({
      query: ({ minPrice, maxPrice }) => ({
        url: '/product/filterbypricerange', // Update the endpoint URL accordingly
        method: 'POST',
        body: {
          minPrice,
          maxPrice
        },
      }),
    }),
     filterProductsByCategories: builder.mutation({
      query: (categories) => ({
        url: '/product/filterByCategories', // Adjust the URL
        method: 'POST',
        body: { categories },
      }),
     }),  
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery,useGetCategoryQuery, useFilterProductsMutation,useFilterProductsByCategoriesMutation } = productApi;