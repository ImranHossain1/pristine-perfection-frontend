import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const REVIEW_URL = "/review";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postReview: build.mutation({
      query: (data) => ({
        url: REVIEW_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    reviews: build.query({
      query: () => ({
        url: REVIEW_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
  }),
});

export const { usePostReviewMutation, useReviewsQuery } = reviewApi;
