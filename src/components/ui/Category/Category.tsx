import React from "react";
import ServiceCard from "../Service/ServiceCard";

const Category = ({ category }: { category: any }) => {
  return (
    <div>
      <h1 className="text-center mb-3">{category?.title}</h1>
      <div className="bg-black py-20 mb-8 lg:mb-12 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {category?.makeoverServices &&
          category?.makeoverServices?.map((service: any) => (
            <ServiceCard key={service.id} service={service} theme="dark" />
          ))}
      </div>
    </div>
  );
};

export default Category;
