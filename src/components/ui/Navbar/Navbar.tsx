"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import React, { useEffect, useState } from "react";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/authToken";
import LoadingPage from "@/app/loading";
import {
  adminItems,
  clientItems,
  commonCenterItems,
} from "@/constants/linkItems";
import { useCategoriesQuery } from "@/redux/api/categoryApi";

interface IProps {
  sidebar: boolean;
}

const authItems = [
  { key: "a", label: "Create an Account", href: "/signUp" },
  { key: "b", label: "Login", href: "/login" },
];

const Navbar = ({ sidebar }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, isLoading: isDataLoading } = useCategoriesQuery(undefined);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    role: "",
  });

  const path = usePathname();
  const router = useRouter();
  const { email, role } = getUserInfo() as any;
  const handleLogout = () => {
    removeUserInfo(authKey);
    setCurrentUser({ id: "", role: "" });
    router.push("/login");
  };

  useEffect(() => {
    if (email && role) setCurrentUser({ id: email, role: role });
    setIsLoading(false);
  }, [email, role]);

  if (isLoading || isDataLoading) return <LoadingPage />;

  return (
    <div className="px-3 md:px-12 bg-[#fff8f0] fixed right-0 left-0 top-0 z-50 shadow-lg">
      <div className="navbar bg-[#fff8f0]">
        {/* mobile device  */}
        <div className="navbar-start">
          <Link
            href={"/"}
            className="btn btn-ghost normal-case text-xl lg:text-2xl text-[#92140C] font-bold no-underline"
          >
            Pristine Perfection
          </Link>
        </div>
        {/* center items - desktop  */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {commonCenterItems?.map((item) => {
              return !item?.dropdown ? (
                <li
                  className={path == item?.href ? "active" : ""}
                  key={item?.href}
                >
                  <Link
                    href={item?.href}
                    className="no-underline text-lg text-[#1e1e24] mx-1"
                  >
                    {item?.label}
                  </Link>
                </li>
              ) : (
                <div className="dropdown dropdown-hover">
                  <li className="text-lg text-[#1e1e24] mx-1">
                    <label tabIndex={0}>{item?.label}</label>
                  </li>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-30 menu p-2 shadow bg-[#FFF8F0] rounded w-fit"
                  >
                    {data &&
                      data?.map((category: any) => (
                        <li key={category?.id}>
                          <Link
                            href={`/package/${category?.id}`}
                            className="no-underline text-xs md:text-sm text-[#1e1e24] mx-1 whitespace-nowrap"
                          >
                            {category?.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </ul>
        </div>

        {/* drawer content  */}
        <div className="navbar-end">
          {/* logout button for dashboard interface  */}
          {currentUser.id && !sidebar && (
            <button
              onClick={() => handleLogout()}
              className="border border-[#1e1e24] bg-[#fff8f0] cursor-pointer text-[#1e1e24] h-10 hover:bg-[#1e1e24] hover:text-[#fff8f0] text-lg lg:text-xl transition-colors duration-500 rounded lg:w-32 mt-4  ml-3 hidden lg:block mb-3 hover:border-white"
            >
              Logout
            </button>
          )}

          {/* sidebar  */}
          <div className={`drawer drawer-end ${!sidebar && "lg:hidden"}`}>
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex justify-end pr-4">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="drawer-button">
                <RxHamburgerMenu className="text-xl md:text-2xl cursor-pointer text-[#1e1e24]" />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-56 md:w-80 min-h-full bg-[#fff8f0] text-[#1e1e24]">
                <div className="flex justify-end mb-2 pr-2">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="cursor-pointer"
                  >
                    <CgClose className="text-[#1e1e24] text-xl lg:text-2xl" />
                  </label>
                </div>
                {/* Sidebar content here */}
                <>
                  {/* auth items  */}
                  {!email &&
                    authItems &&
                    authItems?.map((item) => (
                      <li
                        className={path == item?.href ? "active" : ""}
                        key={item?.href}
                      >
                        <Link
                          href={item?.href}
                          className="no-underline text-lg text-[#1e1e24]"
                        >
                          {item?.label}
                        </Link>
                      </li>
                    ))}

                  {/* end items  */}
                  {currentUser.role &&
                    currentUser.role === "admin" &&
                    adminItems?.map((item) => (
                      <li
                        className={path == item?.href ? "active" : ""}
                        key={item?.href}
                      >
                        <Link
                          href={item?.href}
                          className="no-underline text-lg text-[#1e1e24]"
                        >
                          {item?.label}
                        </Link>
                      </li>
                    ))}
                  {currentUser.role &&
                    currentUser.role === "super_admin" &&
                    adminItems?.map((item) => (
                      <li
                        className={path == item?.href ? "active" : ""}
                        key={item?.href}
                      >
                        <Link
                          href={item?.href}
                          className="no-underline text-lg text-[#1e1e24]"
                        >
                          {item?.label}
                        </Link>
                      </li>
                    ))}
                  {currentUser.role &&
                    currentUser.role === "client" &&
                    clientItems?.map((item) => (
                      <li
                        className={path == item?.href ? "active" : ""}
                        key={item?.href}
                      >
                        <Link
                          href={item?.href}
                          className="no-underline text-lg text-[#1e1e24]"
                        >
                          {item?.label}
                        </Link>
                      </li>
                    ))}
                  {/* center items  */}
                  {commonCenterItems &&
                    commonCenterItems?.map((item) => {
                      return !item?.dropdown ? (
                        <li
                          className={`${
                            path == item?.href ? "active" : ""
                          } lg:hidden`}
                          key={item?.href}
                        >
                          <Link
                            href={item?.href}
                            className="no-underline text-lg text-[#1e1e24]"
                          >
                            {item?.label}
                          </Link>
                        </li>
                      ) : (
                        <div
                          key={item?.href}
                          className="dropdown dropdown-hover lg:hidden"
                        >
                          <li className="text-lg text-[#1e1e24]">
                            <label tabIndex={0}>{item?.label}</label>
                          </li>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-30 menu p-1 shadow bg-[#FFF8F0] rounded w-fit"
                          >
                            {data &&
                              data?.map((category: any) => (
                                <li key={category?.id}>
                                  <Link
                                    href={`/package/${category?.id}`}
                                    className="no-underline text-xs md:text-sm text-[#1e1e24] mx-1 whitespace-nowrap"
                                  >
                                    {category?.title}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      );
                    })}
                  <>
                    {currentUser.id && (
                      <button
                        onClick={() => handleLogout()}
                        className="border border-[#1e1e24]  bg-[#fff8f0] cursor-pointer text-[#1e1e24] h-10 hover:bg-[#1e1e24] hover:text-[#fff8f0] text-lg lg:text-xl transition-colors duration-500 rounded w-44 mt-4  ml-3"
                      >
                        Logout
                      </button>
                    )}
                  </>
                </>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
