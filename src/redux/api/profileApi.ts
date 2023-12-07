import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const PROFILE_URL = "/user";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: () => ({
        url: `${PROFILE_URL}/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    editProfile: build.mutation({
      query: (data) => ({
        url: `${PROFILE_URL}/update-profile`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useProfileQuery, useEditProfileMutation } = profileApi;
