"use client";
import LoadingPage from "@/app/loading";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import FormSelectInput from "@/components/ui/Forms/FormSelectInput";
import FormTextArea from "@/components/ui/Forms/FormTextArea";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useCreateServiceMutation } from "@/redux/api/serviceApi";
import { serviceSchema } from "@/schema/service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreateServicePage = () => {
  const [contentInputs, setContentInputs] = useState([0]);
  const [createService] = useCreateServiceMutation();
  const { data: categoryData, isLoading: isCategoryLoading } =
    useCategoriesQuery({ limit: 100 });
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    data.information = data.information?.filter((info: any) => !!info);
    if (data.information.length < 1) {
      toast.error("Add Information");
      return;
    }
    data.price = Number(data.price);
    data.availability === "true"
      ? (data.availability = true)
      : (data.availability = false);
    const res = await createService(data).unwrap();
    if (res.id) {
      toast.success("Service Created");
      router.push("/admin/manage-service");
    } else toast.error("Something went wrong");
  };

  if (isCategoryLoading) return <LoadingPage />;

  const categoryOptions = categoryData.map((category: any) => ({
    label: category?.title,
    value: category?.id,
  }));

  const availabilityOptions = [
    { label: "Available", value: "true" },
    { label: "Not available", value: "false" },
  ];

  return (
    <div>
      <h2 className="mb-4">Create Service</h2>
      <div className="lg:w-2/3">
        <Form
          submitHandler={handleSubmit}
          doReset={false}
          resolver={yupResolver(serviceSchema)}
        >
          <FormInput name="title" label="Title" placeholder="Service Title" />
          <FormInput
            name="price"
            label="Price"
            type="number"
            placeholder="Service Price"
          />
          <FormSelectInput
            name="categoryId"
            options={categoryOptions}
            label="Select Package Category"
          />
          <FormSelectInput
            name="availability"
            options={availabilityOptions}
            label="Select Availability"
          />
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

export default CreateServicePage;
