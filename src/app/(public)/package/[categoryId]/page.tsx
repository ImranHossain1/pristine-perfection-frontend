"use client";
import LoadingPage from "@/app/loading";
import Heading from "@/components/ui/Heading/Heading";
import ServiceCard from "@/components/ui/Service/ServiceCard";
import { useSingleCategoryQuery } from "@/redux/api/categoryApi";
import React from "react";

const CategoryPage = ({ params }: { params: any }) => {
  const { categoryId } = params;
  const { data, isLoading } = useSingleCategoryQuery(categoryId);

  if (isLoading) return <LoadingPage />;
  return (
    <div>
      <Heading label={data?.title} subLabel="Package Category" />
      <div className="flex flex-wrap justify-center">
        {data?.makeoverServices &&
          data?.makeoverServices?.map((service: any) => (
            <ServiceCard key={service?.id} service={service} theme="light" />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
