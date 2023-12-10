"use client";
import LoadingPage from "@/app/loading";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import FormTextArea from "@/components/ui/Forms/FormTextArea";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import UploadImage from "@/components/ui/Forms/UploadImage";
import {
  useSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { categorySchema } from "@/schema/category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const UpdateCategoryPage = ({ params }: { params: any }) => {
  const { categoryId } = params;
  const { data: categoryData, isLoading } = useSingleCategoryQuery(categoryId);
  const [updateCategory] = useUpdateCategoryMutation();
  const [contentInputs, setContentInputs] = useState([0]);
  const router = useRouter();

  useEffect(() => {
    setContentInputs(
      categoryData?.information?.map((info: string, index: number) => index)
    );
  }, [categoryData?.information]);

  if (isLoading) return <LoadingPage />;

  const defaultValues = {
    title: categoryData?.title,
    information: categoryData?.information,
  };

  const handleSubmit = async (values: any) => {
    values.information = values.information?.filter((info: any) => !!info);
    if (values.information.length < 1) {
      toast.error("Add Information");
      return;
    }
    const updateCategoryData = {
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
    formData.append("data", JSON.stringify(updateCategoryData));

    const res = await updateCategory({
      id: categoryData?.id,
      payload: formData,
    }).unwrap();
    if (res.id) {
      toast.success("Category Updated");
      router.push("/admin/manage-category");
    } else toast.error("Something went wrong");
  };

  return (
    <div>
      <h2 className="mb-4">Update Category</h2>
      <div className="lg:w-2/3">
        <Form
          submitHandler={handleSubmit}
          doReset={false}
          resolver={yupResolver(categorySchema)}
          defaultValues={defaultValues}
        >
          <UploadImage name="file"></UploadImage>
          <FormInput name="title" label="Title" placeholder="Category Title" />
          {/* <FormInput name="image" label="Image" placeholder="Image URL" /> */}

          <div className="mb-1">Information</div>
          {contentInputs?.map((order) => (
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
          <SubmitButton label="Update" />
        </Form>
      </div>
    </div>
  );
};

export default UpdateCategoryPage;
