import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://onlineshopapi-production.up.railway.app' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
      transformResponse: (response) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(response);
          }, 1500);
        });
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
