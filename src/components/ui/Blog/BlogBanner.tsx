import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BlogBanner = ({ blog }: { blog: any }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/blog/${blog?.id}`)}
      className="m-3 cursor-pointer rounded overflow-hidden w-64 h-64  md:h-80 md:w-80 group relative hover:scale-95 transition-transform duration-300 ease-in-out"
    >
      <Image
        src="https://i.ibb.co/9WLqXvH/162044866-494105921752427-2053151397308435679-n.jpg"
        alt=""
        width={500}
        height={500}
        className="h-full w-full"
      />

      <div className=" flex absolute top-0 right-0 left-0 w-full h-full bg-black bg-opacity-70  justify-center items-center flex-col space-y-2 text-lg md:text-xl p-2 transition-opacity duration-300 ease-in-out">
        <div className="uppercase text-[#FFF8F0] text-center whitespace-pre-wrap">
          {blog?.title}
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
