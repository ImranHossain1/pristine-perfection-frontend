import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const REVIEW_URL = "/review";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/${data?.id}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    updateReview: build.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/${data?.id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.booking, tagTypes.review],
    }),
    deleteReview: build.mutation({
      query: (id: string) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "Delete",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    reviews: build.query({
      query: () => ({
        url: REVIEW_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation
} = reviewApi;
