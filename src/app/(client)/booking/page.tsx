"use client";
import LoadingPage from "@/app/loading";
import BookingDetails from "@/components/ui/Booking/BookingDetails";
import HeadingStart from "@/components/ui/Heading/HeadingStart";
import Modal from "@/components/ui/Modal/Modal";
import {
  useCancelMyBookingMutation,
  useMyBookingsQuery,
} from "@/redux/api/bookingApi";
import { usePostReviewMutation } from "@/redux/api/reviewApi";
import { Col, Rate, Row, Space, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const BookingsPage = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const { data, isLoading } = useMyBookingsQuery(undefined);
  const [cancelMyBooking] = useCancelMyBookingMutation();
  console.log(data);
  const [reviewId, setReviewId] = useState<string>("");
  const [reviewText, setReviewText] = useState("");
  const [updateReviewText, setUpdateReviewText] = useState("");
  const [rating, setRating] = useState(3);
  const [updateRating, setUpdateRating] = useState(3);
  const [actionType, setActionType] = useState<string>("post");
  const [postReview] = usePostReviewMutation();

  if (isLoading) return <LoadingPage />;

  const handleDeleteBooking = async (id: string) => {
    const res = await cancelMyBooking(id);
    toast.success("Your Booking has been canceled");
    setModalOpen(false);
  };
  const handleBookingReview = async (id: string) => {
    console.log(id);
    const reviewData = {
      review: reviewText,
      rating: rating,
    };
    try {
      const res = await postReview({
        ...reviewData,
        id: id,
      }).unwrap();
      if (res?.id) {
        toast.success("Thank you for your review!");
        setModalOpen(false);
      }
    } catch (err: any) {
      console.log(err);
      setModalOpen(false);
    }
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
                      label="Views"
                      btnSize="btn-xs"
                      btnTheme="btn"
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                    >
                      <BookingDetails data={booking} />
                    </Modal>

                    {booking.status === "completed" ? (
                      !booking.reviewAndRating ? (
                        <div className="lg:ml-2">
                          <Modal
                            htmlFor={`booking/review/${booking?.id}`}
                            label="Review"
                            btnSize="btn-xs"
                            btnTheme="btn-success"
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                          >
                            <div>
                              <h3>Give us a review how we did that?</h3>
                              <>
                                <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                                  <Col span={12} style={{ margin: "15px 0" }}>
                                    <TextArea
                                      placeholder="Tell us how we did that?"
                                      autoSize={{ minRows: 2, maxRows: 6 }}
                                      value={reviewText}
                                      onChange={(e) =>
                                        actionType === "post"
                                          ? setReviewText(e.target.value)
                                          : actionType === "update"
                                          ? setUpdateReviewText(e.target.value)
                                          : undefined
                                      }
                                    />
                                  </Col>
                                </Row>
                                <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                                  <Space>
                                    <Rate
                                      tooltips={desc}
                                      onChange={setRating}
                                      value={
                                        actionType === "post"
                                          ? +rating
                                          : actionType === "update"
                                          ? +updateRating
                                          : undefined
                                      }
                                    />
                                    {rating ? (
                                      <span>{desc[rating - 1]}</span>
                                    ) : (
                                      ""
                                    )}
                                  </Space>
                                </Row>
                              </>
                              <div className="flex justify-end mt-3">
                                <button
                                  onClick={() =>
                                    handleBookingReview(booking?.id)
                                  }
                                  className="btn btn-success rounded btn-sm"
                                >
                                  Review
                                </button>
                                <button
                                  onClick={() =>
                                    handleBookingReview(booking?.id)
                                  }
                                  className="btn btn-error rounded btn-sm ml-2"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </Modal>
                        </div>
                      ) : (
                        <>
                          <Tooltip
                            title={data.reviewAndRating?.review}
                            color="#218380"
                            key={booking.reviewAndRating.id}
                            className="ml-5"
                          >
                            <Rate
                              disabled
                              defaultValue={booking.reviewAndRating.rating}
                            />
                          </Tooltip>
                        </>
                      )
                    ) : (
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
                    )}
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
