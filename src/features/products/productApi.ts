import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../services/baseQuery';

import {
  ProductsResponse,
  Product,
  CategoryListResponse,
  Category,
} from './types';

export const productApi = createApi({
  reducerPath: 'productApi',

  baseQuery,

  tagTypes: ['Products'],

  endpoints: builder => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),

      providesTags: ['Products'],

      transformResponse: (response: ProductsResponse) => {
        const shuffled = [...response.products];

        shuffled.sort(() => Math.random() - 0.5);

        return {
          ...response,
          products: shuffled,
        };
      },
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
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductCategoryListQuery
} = productApi;
