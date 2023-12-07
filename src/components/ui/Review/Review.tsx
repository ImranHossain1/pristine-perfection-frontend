import React from "react";
import ReviewCard from "./ReviewCard";
import Form from "../Forms/Form";
import FormTextArea from "../Forms/FormTextArea";
import FormRatingInput from "../Forms/FormRatingInput";
import SubmitButton from "../Forms/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewSchema } from "@/schema/review";
import PrimaryButton from "../Button/PrimaryButton";

const Review = ({
  reviewAndRatings,
  submitHandler,
  setRating,
  userId,
}: {
  reviewAndRatings: any;
  submitHandler: any;
  setRating: any;
  userId?: string;
}) => {
  const ratingsArray = [1, 2, 3, 4, 5];
  return (
    <div className="">
      {reviewAndRatings && reviewAndRatings?.length < 1 ? (
        <div className="md:text-xl">No Reviews Posted Yet</div>
      ) : (
        reviewAndRatings?.map((review: any) => (
          <ReviewCard key={review?.id} review={review} />
        ))
      )}

      <div>
        {userId && (
          <>
            <div className="mb-3 mt-12 text-lg md:text-2xl">Add a Review</div>
            <Form
              submitHandler={submitHandler}
              resolver={yupResolver(reviewSchema)}
            >
              <div className="rating mb-3">
                {ratingsArray?.map((el) => (
                  <input
                    key={el}
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    onClick={() => setRating(el)}
                  />
                ))}
              </div>
              <FormTextArea name="review" />
              <PrimaryButton label="Submit" type="submit" />
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
