"use client";
import LoadingPage from "@/app/loading";
import React from "react";
import Heading from "../Heading/Heading";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import ServiceCategoryCard from "../Service/ServiceCategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedSection = () => {
  const { data, isLoading } = useCategoriesQuery({ limit: 100 });
  if (isLoading) return <LoadingPage />;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div>
      <Heading label="Packages" subLabel="Makeover" />
      <Slider {...settings} className=" hidden md:block">
        {data &&
          data?.map((category: any) => (
            <ServiceCategoryCard key={category?.id} category={category} />
          ))}
      </Slider>
      <div className="carousel w-full rounded border-solid border border-[#FFCF99] py-1 md:hidden">
        {data &&
          data?.map((category: any) => (
            <div key={category?.id} className="carousel-item">
              <ServiceCategoryCard category={category} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
