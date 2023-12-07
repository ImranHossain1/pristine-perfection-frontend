"use client";
import React from "react";
import StyledComponentsRegistry from "./AntdRegistry";
import { IChildrenProps } from "@/types/common";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Providers = ({ children }: IChildrenProps) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
