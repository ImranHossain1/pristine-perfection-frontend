"use client";
import LoadingPage from "@/app/loading";
import BookingDetails from "@/components/ui/Booking/BookingDetails";
import HeadingStart from "@/components/ui/Heading/HeadingStart";
import Modal from "@/components/ui/Modal/Modal";
import {
  useCancelMyBookingMutation,
  useMyBookingsQuery,
} from "@/redux/api/bookingApi";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const BookingsPage = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const { data, isLoading } = useMyBookingsQuery(undefined);
  const [cancelMyBooking] = useCancelMyBookingMutation();
  if (isLoading) return <LoadingPage />;

  const handleDeleteBooking = async (id: string) => {
    const res = await cancelMyBooking(id);
    toast.success("Your Booking has been canceled");
    setModalOpen(false);
  };

  if (!data || data?.length < 1)
    return <h2 className="text-center">You do not have any Bookings</h2>;

  return (
    <div>
      <HeadingStart label="My Bookings" subLabel="Booked Services" />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-[#92140c]">
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Date</th>
              <th>Time slot</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          {/* body  */}
          <tbody>
            {data &&
              data?.map((booking: any) => (
                <tr key={booking?.id}>
                  <th>{booking?.makeoverService?.title}</th>
                  <td>{booking?.makeoverService?.price}</td>
                  <td>{booking?.date}</td>
                  <td>
                    {booking?.startTime} - {booking?.endTime}
                  </td>
                  <td>{booking?.status}</td>
                  <td className="flex flex-col lg:flex-row">
                    <Modal
                      htmlFor={`booking/view/${booking?.id}`}
                      label="View"
                      btnSize="btn-xs"
                      btnTheme="btn"
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                    >
                      <BookingDetails data={booking} />
                    </Modal>
                    <div className="lg:ml-2">
                      <Modal
                        htmlFor={`booking/cancel/${booking?.id}`}
                        label="Cancel"
                        btnSize="btn-xs"
                        btnTheme="btn-error"
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                      >
                        <div>
                          <h3 className="text-center">
                            Your Booking will be deleted by clicking Delete
                          </h3>
                          <div className="flex justify-center mt-3">
                            <button
                              onClick={() => handleDeleteBooking(booking?.id)}
                              className="btn btn-error rounded btn-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;
