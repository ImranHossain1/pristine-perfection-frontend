import React from "react";

const LoadingButton = () => {
  return (
    <button
      disabled
      className="border border-[#15191E] px-4 h-12 bg-[#15191E] text-white "
    >
      <span className="loading loading-dots loading-md"></span>
    </button>
  );
};

export default LoadingButton;
