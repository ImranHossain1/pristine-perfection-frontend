"use client";
import LoadingPage from "@/app/loading";
import AdditionalInformation from "@/components/ui/AdditionalInformation/AdditionalInformation";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import Heading from "@/components/ui/Heading/Heading";
import Review from "@/components/ui/Review/Review";
import ServiceDetailsCard from "@/components/ui/Service/ServiceDetailsCard";
import { usePostReviewMutation } from "@/redux/api/reviewApi";
import { useSingleServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ServiceDetailsPage = ({ params }: { params: any }) => {
  const { id } = params;
  const [layout, setLayout] = useState("additional-info");
  const [rating, setRating] = useState<number | null>(null);
  const { data, isLoading } = useSingleServiceQuery(id as string);
  const [postReview] = usePostReviewMutation();
  const router = useRouter();

  if (isLoading) return <LoadingPage />;
  const { userId } = getUserInfo() as any;

  const handleReviewSubmit = async (data: any) => {
    try {
      if (rating) data.rating = rating;
      if (userId) data.userId = userId;
      if (id) data.makeoverServiceId = id;
      const res = await postReview(data).unwrap();
      res
        ? toast.success("Review posted")
        : toast.error("We already received your review");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Heading label={data?.title} subLabel="Makeover Service" />
      <ServiceDetailsCard data={data} bookBtn={true} />

      <div className="flex justify-center mt-12 lg:mt-20 mb-10 space-x-6 md:space-x-12">
        <button
          onClick={() => setLayout("additional-info")}
          className={`border-none bg-transparent text-lg lg:text-2xl uppercase cursor-pointer text-[#1E1E24] ${
            layout === "additional-info" && "text-[#92140C]"
          }`}
        >
          Additional <br /> Information
        </button>
        <button
          onClick={() => setLayout("review")}
          className={`border-none bg-transparent text-lg lg:text-2xl uppercase cursor-pointer text-[#1E1E24] ${
            layout === "review" && "text-[#92140C]"
          }`}
        >
          Reviews
        </button>
      </div>

      {layout === "additional-info" && data?.category?.information && (
        <div className="mt-3 text-[#1E1E24]">
          <AdditionalInformation
            information={data?.category?.information}
            textSize="lg:text-lg text-base"
          />
        </div>
      )}

      {layout === "review" && (
        <Review
          reviewAndRatings={data?.reviewAndRatings}
          submitHandler={handleReviewSubmit}
          setRating={setRating}
          userId={userId}
        />
      )}
    </div>
  );
};

export default ServiceDetailsPage;
