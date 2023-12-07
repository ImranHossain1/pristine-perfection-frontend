import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const URL = "/admin";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // to get all users
    users: build.query({
      query: (query: Record<string, any>) => ({
        url: `${URL}/get-user`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user],
    }),

    // to get single user
    singleUser: build.query({
      query: (id) => ({
        url: `${URL}/get-user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    // to update user
    updateUser: build.mutation({
      query: ({ id, payload }) => ({
        url: `${URL}/update-user/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    // to delete user
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${URL}/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),

    // to update user role
    updateUserRole: build.mutation({
      query: ({ id, payload }) => ({
        url: `${URL}/user-role/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUsersQuery,
  useSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = userApi;
