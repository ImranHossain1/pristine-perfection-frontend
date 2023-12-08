"use client";
import LoadingPage from "@/app/loading";
import BookingDetails from "@/components/ui/Booking/BookingDetails";
import BookingDetailsAdmin from "@/components/ui/Booking/BookingDetailsAdmin";
import Modal from "@/components/ui/Modal/Modal";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAllBookingsQuery,
  useDeleteBookingMutation,
} from "@/redux/api/bookingApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ManageBookingPage = () => {
  const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debounce = useDebounce(searchTerm, 600);

  if (!!debounce) query["search"] = searchTerm;

  const { data, isLoading } = useAllBookingsQuery({ ...query });

  if (isLoading) return <LoadingPage />;

  if (data?.length < 1) return <h2 className="text-center">No Bookings</h2>;

  return (
    <div>
      {data &&
        data?.map((booking: any) => (
          <BookingDetailsAdmin key={booking?.id} booking={booking} />
        ))}
    </div>
  );
};

export default ManageBookingPage;
