"use client";
import Navbar from "@/components/ui/Navbar/Navbar";
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import { adminItems } from "@/constants/linkItems";
import { IChildrenProps } from "@/types/common";
import React from "react";
import Redirect from "@/components/ui/Redirect/Redirect";

const AdminLayout = ({ children }: IChildrenProps) => {
  return (
    // <Redirect role="admin">
    <>
      <Navbar sidebar={false} />
      <div className="mt-20 flex">
        <Sidebar items={adminItems} />
        <div className="lg:p-12 p-6 w-full">{children}</div>
      </div>
    </>

    // </Redirect>
  );
};

export default AdminLayout;
