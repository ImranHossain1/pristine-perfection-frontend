import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  service: any;
  theme: "dark" | "light";
  categoryTitle?: boolean;
}

const ServiceCard = ({ service, theme, categoryTitle = false }: IProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/service/${service?.id}`)}
      className="m-3 cursor-pointer rounded overflow-hidden w-64 h-64  md:h-80 md:w-80 group relative hover:scale-95 transition-transform duration-300 ease-in-out"
    >
      <Image
        src={
          service?.image
            ? service?.image
            : "https://i.ibb.co/Kx0MBjW/161458103-804714766803585-5018531988672904671-n.jpg"
        }
        alt=""
        width={500}
        height={500}
        className="h-full w-full"
      />

      <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 flex absolute top-0 right-0 left-0 w-full h-full bg-black bg-opacity-70  justify-center items-center flex-col space-y-2 text-lg md:text-xl transition-opacity duration-300 ease-in-out">
        <div className="uppercase text-[#FFF8F0] text-center whitespace-pre-wrap px-2">
          {service?.title}
        </div>
        <div className="uppercase text-[#FFF8F0] text-center">
          <span className="text-[#ffcf99]">TK </span>
          {service?.price} /=
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
