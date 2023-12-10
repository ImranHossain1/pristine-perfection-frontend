"use client";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import UploadImage from "@/components/ui/Forms/UploadImage";
import FormTextArea from "@/components/ui/Forms/FormTextArea";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { categorySchema } from "@/schema/category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreateCategoryPage = () => {
  const [contentInputs, setContentInputs] = useState([0]);
  const [createCategory] = useCreateCategoryMutation();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    values.information = values.information?.filter((info: any) => !!info);
    if (values.information.length < 1) {
      toast.error("Add Information");
      return;
    }
    const categoryData = {
      category: {
        title: values.title,
        information: values.information,
      },
    };
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];

    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", JSON.stringify(categoryData));

    const res = await createCategory(formData).unwrap();
    if (res.id) {
      toast.success("Category Created");
      router.push("/super-admin/manage-category");
    } else toast.error("Something went wrong");
  };

  return (
    <div>
      <h2 className="mb-4">Create Category</h2>
      <div className="lg:w-2/3">
        <Form
          submitHandler={handleSubmit}
          doReset={false}
          resolver={yupResolver(categorySchema)}
        >
          <UploadImage name="file"></UploadImage>
          <FormInput name="title" label="Title" placeholder="Category Title" />
          <div className="mb-1">Information</div>
          {contentInputs.map((order) => (
            <div key={order}>
              <FormTextArea
                name={`information[${order}]`}
                placeholder="Add Information"
              />
            </div>
          ))}

          {/* buttons  */}
          <button
            type="button"
            onClick={() =>
              setContentInputs([
                ...contentInputs,
                contentInputs[contentInputs.length - 1] + 1,
              ])
            }
            className="btn btn-sm btn-neutral block mb-10"
          >
            Add Information
          </button>

          {/* ends here  */}
          <SubmitButton label="Create" />
        </Form>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
