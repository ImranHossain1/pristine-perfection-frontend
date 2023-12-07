import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const BLOG_URL = "/blog";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postBlog: build.mutation({
      query: (data) => ({
        url: BLOG_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    blogs: build.query({
      query: () => ({
        url: BLOG_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    singleBlog: build.query({
      query: (id: string) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    deleteBlog: build.mutation({
      query: (id: string) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  usePostBlogMutation,
  useBlogsQuery,
  useSingleBlogQuery,
  useDeleteBlogMutation,
} = blogApi;
