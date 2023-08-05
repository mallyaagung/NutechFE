import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://nutech-be-two.vercel.app",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({}),
});
