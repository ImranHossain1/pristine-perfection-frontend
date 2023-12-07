"use client";
import LoadingPage from "@/app/loading";
import { useFAQsQuery } from "@/redux/api/faqApi";
import React, { useState } from "react";
import Heading from "../Heading/Heading";

const FAQSection = () => {
  const { data, isLoading } = useFAQsQuery(undefined);
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    if (openItemIndex === index) {
      setOpenItemIndex(null);
    } else {
      setOpenItemIndex(index);
    }
  };
  if (isLoading) return <LoadingPage />;
  const faqData = data?.length > 8 ? data?.slice(0, 8) : data;
  return (
    <div>
      <Heading label="Frequently Asked Questions" subLabel="Clients" />
      <div>
        {faqData &&
          faqData.map((item: any, index: number) => (
            <div className="accordion-item" key={index}>
              <div
                className="lg:text-lg w-11/12 md:w-full px-4 py-2 cursor-pointer bg-[#1E1E24] text-[#FFF8F0] rounded border-0 border-solid border-t border-[#FFF8F0] mt-1"
                onClick={() => toggleItem(index)}
              >
                {item?.question}
              </div>
              {openItemIndex === index && (
                <div className="text-[#FFF8F0] bg-[#1E1E24] px-4 py-3 rounded-b mb-4 w-11/12 md:w-full border-0 border-solid border-t border-[#FFF8F0]">
                  {item?.answer}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FAQSection;
