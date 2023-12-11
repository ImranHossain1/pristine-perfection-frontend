import Link from "next/link";
import React from "react";
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoPinterest } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="text-[#FFF8F0] flex flex-col justify-center h-full bg-[#1E1E24] px-4 md:px-12 lg:px-24 py-4 md:py-8 lg:py-10">
      <div className="md:grid md:grid-cols-2 mb-10 md:mb-20 md:space-x-8 lg:space-x-36">
        <div>
          <h1 className="text-[#FFF8F0] text-xl md:text-2xl uppercase font-normal mb-2 md:mb-4">
            About Us
          </h1>
          <div className="md:text-lg">
            Experience the art of transformation with our Makeover Services,
            where beauty meets expertise. Unleash your radiance and redefine
            your style with our skilled professionals!
          </div>
          <div className="flex space-x-4 text-2xl md:text-4xl mt-2 md:mt-4">
            <BiLogoFacebook />
            <BiLogoInstagram />
            <BiLogoPinterest />
          </div>
        </div>
        <div>
          <h1 className="text-[#FFF8F0] text-xl md:text-2xl uppercase font-normal mb-2 md:mb-4 mt-6 md:mt-0">
            Contact Us
          </h1>
          <div className="md:text-lg">
            Ginnheimer Landstr.42, Frankfurt, Germany- 60487
          </div>
          <div className="md:text-lg text-[#FFCF99] mt-3 md:mt-4">
            +4901XXXXXXX
          </div>
        </div>
      </div>
      <hr className="mb-4 md:mb-8" />
      <div className="md:text-xl">© Pristine Perfection 2023</div>
    </div>
  );
};

export default Footer;
