"use client";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../Button/PrimaryButton";
import { useRouter } from "next/navigation";

const ServiceDetailsCard = ({
  data,
  bookBtn,
}: {
  data: any;
  bookBtn: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-10 items-center justify-center md:mt-12">
      {/* image  */}
      <div>
        <div className="overflow-hidden">
          <Image
            src={
              data?.image
                ? data?.image
                : "https://i.ibb.co/Kx0MBjW/161458103-804714766803585-5018531988672904671-n.jpg"
            }
            alt=""
            height={500}
            width={500}
            className="border-2 border-solid border-[#FFCF99] p-5 rounded-full w-56 h-72 lg:w-80  lg:h-96"
          />
        </div>
      </div>

      {/* details  */}
      <div className="w-full md:w-56 lg:w-80">
        <div className="text-lg md:text-2xl text-[#92140C]">Details</div>
        <div className="mt-1">
          {data?.information &&
            data?.information?.map((info: string, index: number) => (
              <p key={index} className="text-sm md:text-base">
                - {info}
              </p>
            ))}
        </div>
        <div className="text-lg md:text-2xl text-[#92140C] mt-3 md:mt-4">
          Category
        </div>
        <p className="text-sm md:text-base">
          {data?.category?.title ? data?.category?.title : ""}
        </p>
        <div className="text-lg md:text-2xl text-[#92140C] mt-3 md:mt-4">
          Price
        </div>
        <p className="text-sm md:text-base">{data?.price} TK</p>
        {bookBtn && (
          <div
            className="w-fit mt-3 md:mt-4"
            onClick={() => router.push(`/book/${data?.id}`)}
          >
            <PrimaryButton label="Book Now" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsCard;
