"use client";
import React, { useState } from "react";
import BookingInfoCard from "./BookingInfoCard";
import Modal from "../Modal/Modal";
import {
  useBookingsByDateQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
  useUpdateBookingStatusMutation,
} from "@/redux/api/bookingApi";
import { toast } from "react-hot-toast";
import DatePickerComponent from "../DatePicker/DatePicker";
import { format } from "date-fns";
import LoadingPage from "@/app/loading";
import { checkAvailableSlots } from "@/utils/chechAvailableSlots";
import { slotOptions } from "@/constants/slotOptions";

const BookingDetailsAdmin = ({ booking }: { booking: any }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [slot, setSlot] = useState("");
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();
  const { data: slotData, isLoading: isSlotLoading } = useBookingsByDateQuery(
    selectedDate && format(selectedDate, "yyyy-MM-dd")
  );

  const handleUpdateStatus = async (id: string, status: string) => {
    const res = await updateBookingStatus({
      id: id,
      payload: { status: status },
    });
    toast.success(`Status updated to "${status.toUpperCase()}"`);
  };

  const handleDeleteBooking = async (id: string) => {
    const res = await deleteBooking(id);
    toast.success("Booking Deleted");
    setModalOpen(false);
  };

  const handleAdjustSchedule = async (id: string) => {
    if (!slot) {
      toast.error("Please select a Slot for booking");
      return;
    } else if (!selectedDate) {
      toast.error("Please select a Date for booking");
      return;
    }
    const selectedSlot = JSON.parse(slot);
    const payload = {
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: selectedSlot?.startTime,
      endTime: selectedSlot?.endTime,
      status: "confirmed",
    };
    const res = await updateBooking({ id: id, payload: payload }).unwrap();
    if (res?.id) toast.success("Rescheduled");
    else toast.error("Something went wrong");
    setModalOpen(false);
  };

  if (isSlotLoading) return <LoadingPage />;

  const availableSlots = checkAvailableSlots(slotOptions, slotData);

  return (
    <div
      style={{ border: "1px solid black" }}
      className="card-side bg-base-100 z-0 mb-6"
    >
      <div className="card-body ">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h3>Booking Details</h3>
            <div className="mt-6">
              <BookingInfoCard
                label="Service"
                data={booking?.makeoverService?.title}
              />
              <BookingInfoCard
                label="Category"
                data={booking?.makeoverService?.category?.title}
              />
              <BookingInfoCard label="Date" data={booking?.date} />
              <BookingInfoCard
                label="Slot"
                data={`${booking?.startTime} - ${booking?.endTime}`}
              />
              <BookingInfoCard label="Status" data={booking?.status} />
            </div>
          </div>
          <div>
            <h3>User Details</h3>
            <div className="mt-6">
              <BookingInfoCard label="Name" data={booking?.user?.name} />
              <BookingInfoCard label="Email" data={booking?.user?.email} />
              <BookingInfoCard
                label="Contact Number"
                data={booking?.user?.phone}
              />
              <BookingInfoCard
                label="Alternative Contact Number"
                data={booking?.alternativeContactNo}
              />
              <BookingInfoCard label="Address" data={booking?.user?.address} />
            </div>
          </div>
        </div>
        <div className="card-actions justify-end">
          {/* booking status update  */}
          {booking?.status === "pending" && (
            <Modal
              htmlFor={`admin/booking/update/${booking?.id}`}
              label="Pending"
              btnSize="btn-sm"
              btnTheme="btn-accent"
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            >
              <div>
                <h3 className="text-center">Update Booking Status</h3>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => handleUpdateStatus(booking?.id, "confirmed")}
                    className="btn btn-accent btn-sm mx-2"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(booking?.id, "rejected")}
                    className="btn btn-error btn-sm mx-2"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </Modal>
          )}

          {/* booking schedule adjust  */}
          {booking?.status === "pending" && (
            <Modal
              htmlFor={`admin/booking/schedule/${booking?.id}`}
              label="Adjust Schedule"
              btnSize="btn-sm"
              btnTheme="btn-info"
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            >
              <div>
                <h3 className="mb-4">Current Schedule</h3>
                <div className="grid grid-cols-2">
                  <BookingInfoCard label="Date" data={booking?.date} />
                  <BookingInfoCard
                    label="Slot"
                    data={`${booking?.startTime} - ${booking?.endTime}`}
                  />
                </div>
                <h3 className="my-4">Adjust Schedule</h3>
                <div className="flex flex-col items-center">
                  <DatePickerComponent
                    label="Pick a Date for booking"
                    selectedDate={selectedDate as Date}
                    setSelectedDate={setSelectedDate}
                  />
                  <div className="flex items-center my-4 lg:my-0">
                    <select
                      className="select select-bordered w-full max-w-xs"
                      onChange={(e) => setSlot(e?.target?.value)}
                      disabled={!selectedDate}
                    >
                      <option disabled selected>
                        Pick a time slot
                      </option>
                      {availableSlots.map((option: any, index: number) => (
                        <option
                          key={index}
                          value={JSON.stringify({
                            startTime: option?.startTime,
                            endTime: option?.endTime,
                          })}
                        >
                          {option.startTime} - {option.endTime}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="mt-4 btn"
                    onClick={() => handleAdjustSchedule(booking?.id)}
                  >
                    Reschedule and Confirm
                  </button>
                </div>
              </div>
            </Modal>
          )}

          {/* booking deletion  */}
          {booking?.status !== "confirmed" && (
            <Modal
              htmlFor={`admin/booking/delete/${booking?.id}`}
              label="Delete"
              btnSize="btn-sm"
              btnTheme="btn-error"
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            >
              <div>
                <h3 className="text-center">Confirm Booking Deletion</h3>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => handleDeleteBooking(booking?.id)}
                    className="btn btn-error btn-sm mx-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsAdmin;
