import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="relative md:grid md:grid-cols-2 items-center flex flex-col-reverse space-y-2 md:space-y-0 md:space-x-4">
          <Image
            src="https://i.ibb.co/D5mWy8g/image1.jpg"
            alt=""
            height={500}
            width={500}
            className="shape w-52 h-52 md:w-72 lg:w-96 md:h-72 lg:h-96"
          />
          <div className="text-4xl md:text-5xl lg:text-5xl text-[#92140C] font-heading">
            <div>Unleash Your New Radiance!</div>
            <div className="text-2xl md:text-2xl lg:text-3xl text-[#92140C] mt-8 ">
              Discover a new you with our Makeover App! Try on hairstyles,
              experiment with makeup, and redefine your style effortlessly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
