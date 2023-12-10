import Image from "next/image";
import React from "react";

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <article className="mb-6 text-[#1E1E24]">
      <div className="flex items-center mb-2 space-x-3 ">
        <Image
          className="w-10 h-10 rounded-full border-2 border-solid border-[#FFCF99]"
          src={
            review?.user?.profileImg
              ? review?.user?.profileImg
              : "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702046564/gbifw5rwo76tidd6f3x4.jpg"
          }
          alt=""
          width={300}
          height={300}
        />
        <div className="space-y-1 font-medium md:text-xl">
          <p>{review?.user?.name}</p>
        </div>
      </div>
      {review?.rating && (
        <div className="rating rating-sm">
          {Array.from({ length: Math.round(review?.rating) })?.map(
            (star, index) => (
              <input
                key={index}
                type="radio"
                disabled
                name="rating-1"
                className="mask mask-star"
              />
            )
          )}
        </div>
      )}
      <p className="mb-2 text-sm md:text-lg">{review?.review}</p>
    </article>
  );
};

export default ReviewCard;
