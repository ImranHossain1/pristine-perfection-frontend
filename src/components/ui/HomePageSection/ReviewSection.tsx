"use client";
import LoadingPage from "@/app/loading";
import { useReviewsQuery } from "@/redux/api/reviewApi";
import React from "react";
import Heading from "../Heading/Heading";
import Image from "next/image";
import background from "../../../asset/image/makeup.jpg";
import { Rate } from "antd";
const ReviewSection = () => {
  const { data, isLoading } = useReviewsQuery(undefined);
  if (isLoading) return <LoadingPage />;
  return (
    <div>
      <Heading label="What Client Says" subLabel="Reviews" />

      <div
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702078776/zjg4d7tird50raurgies.jpg')`,
        }}
        className="h-72 md:h-96 w-full overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat flex items-center rounded px-1 md:px-2"
      >
        <div className="carousel w-full rounded">
          {data &&
            data?.map((review: any) => (
              <div
                key={review?.id}
                className="carousel-item mx-3 md:h-60 bg-[#FFF8F0] text-[#1E1E24] rounded p-3 md:p-6 md:w-72 overflow-hidden grid grid-rows-3 h-44 w-56"
              >
                <div className="row-span-2">
                  {review?.review?.length < 110
                    ? review?.review
                    : review?.review?.slice(0, 110) + "..."}
                </div>
                <div className="">
                  <Rate disabled defaultValue={review?.rating} />
                </div>
                <div>
                  <div className="border border-solid border-[#1E1E24] mb-3"></div>
                  <div className="flex space-x-2  md:space-x-4 items-center">
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
                    <div className="text-lg md:text-xl font-semibold">
                      {review?.user?.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
