"use client";
import LoadingPage from "@/app/loading";
import BlogBanner from "@/components/ui/Blog/BlogBanner";
import BlogCard from "@/components/ui/Blog/BlogCard";
import CommonHeading from "@/components/ui/Heading/CommonHeading";
import Heading from "@/components/ui/Heading/Heading";
import { useBlogsQuery } from "@/redux/api/blogApi";
import React from "react";

const BlogPage = () => {
  const { data, isLoading } = useBlogsQuery(undefined);
  if (isLoading) return <LoadingPage />;

  return (
    <div>
      <Heading label="Blogs" subLabel="Makeup" />
      <div className="flex flex-wrap justify-center">
        {data &&
          data?.map((blog: any) => <BlogBanner key={blog?.id} blog={blog} />)}
      </div>
    </div>
  );
};

export default BlogPage;
