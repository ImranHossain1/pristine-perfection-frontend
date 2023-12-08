"use client";
import Navbar from "@/components/ui/Navbar/Navbar";
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import { clientItems } from "@/constants/linkItems";
import { IChildrenProps } from "@/types/common";
import React from "react";
import Redirect from "@/components/ui/Redirect/Redirect";

const ClientLayout = ({ children }: IChildrenProps) => {
  return (
    <Redirect role="client">
      <Navbar sidebar={false} />
      <div className="mt-20 flex">
        <Sidebar items={clientItems} />
        <div className="lg:p-12 p-6">{children}</div>
      </div>
    </Redirect>
  );
};

export default ClientLayout;
