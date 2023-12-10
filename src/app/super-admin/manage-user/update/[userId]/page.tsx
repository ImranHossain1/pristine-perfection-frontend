"use client";
import LoadingPage from "@/app/loading";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import { useSingleUserQuery, useUpdateUserMutation } from "@/redux/api/userApi";
import { userSchema } from "@/schema/auth";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const UpdateUserPage = ({ params }: { params: any }) => {
  const { userId } = params;
  const { data: userData, isLoading } = useSingleUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const router = useRouter();

  if (isLoading) return <LoadingPage />;

  const defaultValues = {
    name: userData?.name,
    phone: userData?.phone,
    address: userData?.address,
  };

  const handleSubmit = async (data: any) => {
    const res = await updateUser({
      id: userData?.id,
      payload: data,
    }).unwrap();
    if (res) {
      toast.success("User Updated");
      router.push("/admin/manage-user");
    } else toast.error("Something went wrong");
    return;
  };

  return (
    <div>
      <h2 className="mb-4">Update User</h2>
      <div className="lg:w-2/3">
        <Form
          submitHandler={handleSubmit}
          doReset={false}
          resolver={yupResolver(userSchema)}
          defaultValues={defaultValues}
        >
          <FormInput name="name" label="User Name" placeholder="User Name" />
          <FormInput
            name="phone"
            label="User Phone Number"
            placeholder="User Phone Number"
          />
          <FormInput
            name="address"
            label="User Address"
            placeholder="User Address"
          />

          <SubmitButton label="Update User" />
        </Form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
