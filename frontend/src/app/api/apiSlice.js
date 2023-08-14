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
   
    getFilterProducts: builder.query({
      
        query:({range}) =>({
          url: `/product/filterbypricerange?minPrice=${range.minPrice}&maxPrice=${range.maxPrice}`,
          method: 'GET',
        })
    }),
     
     getFilterProductsByCategories: builder.query({
      query: (categories) => ({
        
        url : `/products/filterbycategories/${categories}`,
        method: 'GET',
      })
     }),  
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery,useGetCategoryQuery,useGetFilterProductsQuery,useGetFilterProductsByCategoriesQuery } = productApi;