import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  category: any;
}

const ServiceCategoryCard = ({ category }: IProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/package/${category?.id}`)}
      className="m-3 cursor-pointer rounded overflow-hidden w-64 h-64 lg:h-72 xl:h-80  md:w-auto group relative hover:scale-95 transition-transform duration-300 ease-in-out"
    >
      <Image
        src={
          category?.image
            ? category?.image
            : "https://i.ibb.co/qxRxv5K/image2.jpg"
        }
        alt=""
        width={500}
        height={500}
        className="h-full w-full"
      />

      <div className="opacity-100 lg:opacity-0  lg:group-hover:opacity-100 flex absolute top-0 right-0 left-0 w-full h-full bg-black bg-opacity-70  justify-center items-center flex-col space-y-2 text-lg md:text-xl p-2 transition-opacity duration-300 ease-in-out">
        <div className="uppercase text-[#FFF8F0] text-center whitespace-pre-wrap">
          {category?.title}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategoryCard;
