"use client";
import LoadingPage from "@/app/loading";
import { useSingleBlogQuery } from "@/redux/api/blogApi";
import React from "react";

const BlogDetails = ({ params }: { params: any }) => {
  const { blogId } = params;
  const { data, isLoading } = useSingleBlogQuery(blogId);
  if (isLoading) return <LoadingPage />;

  return (
    <div className="">
      <h1 className="text-[#92140C] text-xl md:text-2xl">{data?.title}</h1>
      <div className="lg:mt-6 mt-3 text-base lg:text-xl">
        <p>{data?.content}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
