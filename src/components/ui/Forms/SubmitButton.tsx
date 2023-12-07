import React from "react";

const SubmitButton = ({ label }: { label: string }) => {
  return (
    <button
      type="submit"
      className="border border-[#15191E] bg-white cursor-pointer text-[#15191E] px-4 h-12 hover:bg-[#15191E] hover:text-white text-lg lg:text-xl transition-colors duration-500 rounded-md"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
