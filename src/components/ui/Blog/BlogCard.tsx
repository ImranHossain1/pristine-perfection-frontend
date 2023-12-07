import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  blog: any;
  theme: "dark" | "light";
}

const BlogCard = ({ blog, theme }: IProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/blog/${blog?.id}`)}
      className="m-4 cursor-pointer w-56 md:w-64 lg:w-72"
    >
      <div className="relative overflow-hidden rounded">
        <Image
          src="https://i.ibb.co/9WLqXvH/162044866-494105921752427-2053151397308435679-n.jpg"
          alt=""
          width={300}
          height={300}
          className="hover:scale-105 transition-transform duration-700 ease-in-out rounded w-56 md:w-64 lg:w-72"
        />
      </div>
      <div
        className={`lg:text-xl uppercase mt-3 ${
          theme === "dark" ? "text-[#FFF8F0]" : "text-black"
        }`}
      >
        {blog?.title}
      </div>
    </div>
  );
};

export default BlogCard;
