import React from "react";

const HeadingStart = ({
  label,
  subLabel,
}: {
  label: string;
  subLabel?: string;
}) => {
  return (
    <div>
      {subLabel && <p className=" text-[#92140C] uppercase mb-3">{subLabel}</p>}
      <h1 className=" mb-6 md:mb-10 text-[#1E1E24] lg:text-3xl uppercase font-normal">
        {label}
      </h1>
    </div>
  );
};

export default HeadingStart;
