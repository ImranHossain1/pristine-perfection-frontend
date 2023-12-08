import Navbar from "@/components/ui/Navbar/Navbar";
import { IChildrenProps } from "@/types/common";
import React from "react";

const PublicPage = ({ children }: IChildrenProps) => {
  return (
    <>
      <Navbar sidebar={true} />
      <div className="pt-32 md:pt-36 lg:pt-40 max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
        {children}
      </div>
    </>
  );
};

export default PublicPage;
