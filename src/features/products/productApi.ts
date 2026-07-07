import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../services/baseQuery';

import {
  ProductsResponse,
  Product,
  CategoryListResponse,
  Category,
  ProductsRequest,
} from './types';

const productApi = createApi({
  reducerPath: 'productApi',

  baseQuery,

  tagTypes: ['Products'],

  endpoints: builder => ({
    getProducts: builder.query<ProductsResponse, ProductsRequest>({
      query: ({ limit, skip }) => ({
        url: `/products?limit=${limit}&skip=${skip}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
      transformResponse: (response: ProductsResponse) => response,
    }),

    getProductById: builder.query<Product, number>({
      query: id => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),

    getProductCategoryList: builder.query<CategoryListResponse, void>({
      query: () => ({
        url: '/products/category-list',
        method: 'GET',
      }),

      transformResponse: (response: string[]): Category[] => {
        return response.map(category => ({
          value: category,
          label: category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        }));
      },
    }),
  }),
});

export const {
  // Hooks for queries
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductCategoryListQuery,
  // Reducer
  reducerPath: productApiReducerPath,
  reducer: productApiReducer,
  // Middleware
  middleware: productApiMiddleware,
} = productApi;
