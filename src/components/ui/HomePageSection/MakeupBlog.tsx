"use client";
import React from "react";
import Heading from "../Heading/Heading";
import { useBlogsQuery } from "@/redux/api/blogApi";
import LoadingPage from "@/app/loading";
import BlogCard from "../Blog/BlogCard";

const MakeupBlog = () => {
  const { data, isLoading } = useBlogsQuery(undefined);
  if (isLoading) return <LoadingPage />;

  const blogData = data?.slice(0, 3);

  return (
    <div>
      <Heading label="Read Blogs" subLabel="Makeup trends" />
      <div className="bg-[#1E1E24] md:px-12 px-4 py-10 md:py-20 mb-8 lg:mb-12 flex flex-wrap justify-center rounded">
        {blogData &&
          blogData?.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} theme="dark" />
          ))}
      </div>
    </div>
  );
};

export default MakeupBlog;
