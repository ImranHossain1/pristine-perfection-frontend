import React from "react";

const PrimaryButton = ({
  label,
  type = "button",
}: {
  label: string;
  type?: "submit" | "button";
}) => {
  return (
    <button
      type={type}
      className="border-solid border-[#92140C] bg-[#92140C] cursor-pointer  px-4 h-12 hover:bg-[#FFF8F0] text-[#FFF8F0] hover:text-[#1E1E24] hover:border-[#1E1E24]  text-lg lg:text-xl transition-colors duration-500 rounded"
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
