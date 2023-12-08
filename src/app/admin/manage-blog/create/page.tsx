"use client";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import FormTextArea from "@/components/ui/Forms/FormTextArea";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import { usePostBlogMutation } from "@/redux/api/blogApi";
import { blogSchema } from "@/schema/blog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const CreateBlogPage = () => {
  const [postBlog] = usePostBlogMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const res = await postBlog(data).unwrap();
    if (res.id) {
      toast.success("Blog Posted");
      router.push("/admin/manage-blog");
    } else toast.error("Something went wrong");
  };

  return (
    <div>
      <h2 className="mb-4">Post Blog</h2>
      <div className="lg:w-2/3">
        <Form
          submitHandler={handleSubmit}
          doReset={false}
          resolver={yupResolver(blogSchema)}
        >
          <FormInput name="title" label="Title" placeholder="Blog Title" />
          <FormTextArea
            name="content"
            label="Blog Content"
            placeholder="Blog Content"
            size="lg"
          />

          {/* ends here  */}
          <SubmitButton label="Post" />
        </Form>
      </div>
    </div>
  );
};

export default CreateBlogPage;
