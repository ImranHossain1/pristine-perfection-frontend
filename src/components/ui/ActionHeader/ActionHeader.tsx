import { useRouter } from "next/navigation";
import React from "react";

const ActionHeader = ({
  setSearchTerm,
  label,
  href,
  doSearch = true,
}: {
  setSearchTerm?: any;
  label: string;
  href: string;
  doSearch?: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="mb-8">
      <h1 className="mb-3">{label}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {doSearch ? (
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="border border-gray-700 h-11 focus:border-gray-700 px-2 text-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        ) : (
          <div></div>
        )}
        <div className="flex justify-end items-center mt-4 lg:mt-0">
          <button
            onClick={() => router.push(href)}
            className="border border-[#15191E] bg-white cursor-pointer text-[#15191E] px-4 h-12 hover:bg-[#15191E] hover:text-white text-lg lg:text-xl transition-colors duration-500 rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionHeader;
