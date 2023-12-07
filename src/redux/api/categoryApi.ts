import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/category";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all categories
    categories: build.query({
      query: () => ({
        url: CATEGORY_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // get single categories
    singleCategory: build.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // create category
    createCategory: build.mutation({
      query: (data) => ({
        url: CATEGORY_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    // update category
    updateCategory: build.mutation({
      query: ({ id, payload }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    // delete category
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
