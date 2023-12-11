import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { Col, Rate, Row, Space, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useUpdateReviewMutation } from "@/redux/api/reviewApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { tagTypes } from "@/redux/tagTypes";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const UpdateReview = ({ reviewAndRating }: any) => {
  console.log(reviewAndRating);
  const [modalOpen, setModalOpen] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(3);
  const [initialReviewText, setInitialReviewText] = useState("");
  const [updateReview] = useUpdateReviewMutation();
  const router = useRouter();
  useEffect(() => {
    if (modalOpen && reviewAndRating) {
      setReviewText(reviewAndRating.review || ""); // Set initial review text
      setRating(reviewAndRating?.rating || 3); // Set initial rating (or default to 3)
      setInitialReviewText(reviewAndRating.review || ""); // Save initial review text for comparison
    }
  }, [modalOpen, reviewAndRating]);
  const handleUpdateReview = async (id: string) => {
    let reviewData: { review?: string; rating?: number } = {};

    if (reviewText.trim() !== reviewAndRating.review) {
      reviewData.review = reviewText.trim();
    }

    if (rating !== reviewAndRating.rating) {
      reviewData.rating = rating;
    }

    if (Object.keys(reviewData).length > 0) {
      try {
        const res = await updateReview({
          ...reviewData,
          id: id,
        }).unwrap();
        if (res?.id) {
          toast.success("Thank you for updating your review!");
          setRating(3);
          setReviewText("");
          setModalOpen(false);
        }
      } catch (err: any) {
        console.log(err);
        setModalOpen(false);
      }
    }
  };
  return (
    <div className="lg:ml-2">
      <Modal
        htmlFor={`booking/updateReview/${reviewAndRating.id}`}
        label="Update"
        btnSize="btn-xs"
        btnTheme="btn-success"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <div>
          <h3>Do you want to update your review?</h3>
          <>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={12} style={{ margin: "15px 0" }}>
                <TextArea
                  placeholder="Tell us how we did that?"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Space>
                <Rate tooltips={desc} onChange={setRating} value={rating} />
                {rating ? <span>{desc[rating - 1]}</span> : ""}
              </Space>
            </Row>
          </>
          <div className="flex justify-end mt-3">
            <button
              onClick={() => handleUpdateReview(reviewAndRating?.id)}
              className="btn btn-success rounded btn-sm"
            >
              Review
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="btn rounded btn-sm mx-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateReview;
