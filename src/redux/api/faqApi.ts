import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const FAQ_URL = "/faq";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postFAQ: build.mutation({
      query: (data) => ({
        url: FAQ_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    FAQs: build.query({
      query: () => ({
        url: FAQ_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    singleFAQ: build.query({
      query: (id: string) => ({
        url: `${FAQ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    deleteFAQ: build.mutation({
      query: (id: string) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  usePostFAQMutation,
  useFAQsQuery,
  useSingleFAQQuery,
  useDeleteFAQMutation,
} = faqApi;
