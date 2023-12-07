import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const BOOKING_API = "/booking";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myBookings: build.query({
      query: (data) => ({
        url: `${BOOKING_API}/my-booking`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),

    myBooking: build.query({
      query: (id) => ({
        url: `${BOOKING_API}/${id}/my-booking`,
        method: "GET",
      }),
    }),

    cancelMyBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_API}/${id}/my-booking`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    bookingsByDate: build.query({
      query: (date) => ({
        url: `${BOOKING_API}/${date}/by-date`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),

    bookService: build.mutation({
      query: (data) => ({
        url: `${BOOKING_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    allBookings: build.query({
      query: (query: Record<string, any>) => ({
        url: `${BOOKING_API}`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.booking],
    }),

    singleBooking: build.query({
      query: (id: string) => ({
        url: `${BOOKING_API}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),

    updateBooking: build.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `${BOOKING_API}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    updateBookingStatus: build.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `${BOOKING_API}/${id}/update-status`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    deleteBooking: build.mutation({
      query: (id: string) => ({
        url: `${BOOKING_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useMyBookingQuery,
  useMyBookingsQuery,
  useCancelMyBookingMutation,
  useBookingsByDateQuery,
  useBookServiceMutation,
  useAllBookingsQuery,
  useSingleBookingQuery,
  useUpdateBookingMutation,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
} = bookingApi;
