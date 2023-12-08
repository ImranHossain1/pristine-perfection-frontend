"use client";
import LoadingPage from "@/app/loading";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import FormSelectInput from "@/components/ui/Forms/FormSelectInput";
import FormTextArea from "@/components/ui/Forms/FormTextArea";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const UpdateServicePage = ({ params }: { params: any }) => {
  const { serviceId } = params;
  const { data: serviceData, isLoading } = useSingleServiceQuery(serviceId);
  const { data: categoryData, isLoading: isCategoryLoading } =
    useCategoriesQuery({ limit: 100 });
  const [updateService] = useUpdateServiceMutation() as any;
  const [contentInputs, setContentInputs] = useState([0]);
  const router = useRouter();

  useEffect(() => {
    setContentInputs(
      serviceData?.information?.map((info: string, index: number) => index)
    );
  }, [serviceData?.information]);

  if (isLoading || isCategoryLoading) return <LoadingPage />;

  const categoryOptions = categoryData.map((category: any) => ({
    label: category?.title,
    value: category?.id,
  }));

  const availabilityOptions = [
    { label: "Available", value: "true" },
    { label: "Not available", value: "false" },
  ];

  const defaultValues = {
    title: serviceData?.title,
    price: serviceData?.price,
    information: serviceData?.information,
  };

  const handleSubmit = async (data: any) => {
    data.information = data.information?.filter((info: any) => !!info);
    if (data.information.length < 1) {
      toast.error("Add Information");
      return;
    }
    if (data?.price) data.price = Number(data.price);
    if (data?.availability) {
      data.availability === "true"
        ? (data.availability = true)
        : (data.availability = false);
    }

    const res = await updateService({
      id: serviceData?.id,
      payload: data,
    }).unwrap();
    if (res.id) {
      toast.success("Service Created");
      router.push("/admin/manage-service");
    } else toast.error("Something went wrong");
  };

  return (
    <div>
      <h2 className="mb-4">Update Service</h2>
      <div className="lg:w-2/3">
        <Form
          submitHandler={handleSubmit}
          doReset={false}
          defaultValues={defaultValues}
        >
          <FormInput name="title" label="Title" placeholder="Service Title" />
          <FormInput name="image" label="Image" placeholder="Image URL" />
          <FormInput name="price" label="Price" placeholder="Service Price" />
          <FormSelectInput
            name="categoryId"
            options={categoryOptions}
            label="Select Category"
          />
          <FormSelectInput
            name="availability"
            options={availabilityOptions}
            label="Select Availability"
          />
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

export default UpdateServicePage;
