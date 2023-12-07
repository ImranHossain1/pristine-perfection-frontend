import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedback";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendFeedback: build.mutation({
      query: (data) => ({
        url: FEEDBACK_URL,
        method: "POST",
        data: data,
      }),
    }),

    feedbacks: build.query({
      query: () => ({
        url: FEEDBACK_URL,
        method: "GET",
      }),
    }),
  }),
});

export const { useSendFeedbackMutation, useFeedbacksQuery } = feedbackApi;
