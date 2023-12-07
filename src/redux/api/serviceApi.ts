import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/makeover-service";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all services
    services: build.query({
      query: (query: Record<string, any>) => ({
        url: SERVICE_URL,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.service],
    }),

    // get single service
    singleService: build.query({
      query: (id: string) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    // create service
    createService: build.mutation({
      query: (data) => ({
        url: SERVICE_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    // update service
    updateService: build.mutation({
      query: ({ id, payload }) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    // delete service
    deleteService: build.mutation({
      query: (id: string) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useServicesQuery,
  useSingleServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
