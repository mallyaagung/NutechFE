import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const productsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.name.localeCompare(a.name),
});

const initialState = productsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product",
      transformResponse: (responseData) => {
        return productsAdapter.setAll(initialState, responseData);
      },
    }),
    addNewProduct: builder.mutation({
      query: (productData) => ({
        url: "/product",
        method: "POST",
        body: {
          ...productData,
        },
      }),
    }),
    updateProduct: builder.mutation({
      query: (productData) => ({
        url: `/product/${productData.id}`,
        method: "PUT",
        body: {
          ...productData,
        },
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `product/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = extendedApiSlice;

export const selectProductResult =
  extendedApiSlice.endpoints.getProducts.select();

const selectProductData = createSelector(
  selectProductResult,
  (productsResult) => productsResult.data
);

export const {
  selectAll: selectAllProducts,
  selectIds: selectProductIds,
  selectById: selectProductById,
} = productsAdapter.getSelectors(
  (state) => selectProductData(state) ?? initialState
);
