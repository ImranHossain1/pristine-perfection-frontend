"use client";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import React from "react";
import CommonHeading from "@/components/ui/Heading/CommonHeading";
import { useSignUpMutation } from "@/redux/api/authApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schema/auth";

const CreateUserPage = () => {
  const [signUp] = useSignUpMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const result = await signUp({ ...data }).unwrap();
      if (result) {
        router.push("/admin/manage-user");
        toast.success("Account Created");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <h2 className="mb-8">Create User Account</h2>
      <Form submitHandler={handleSubmit} resolver={yupResolver(signUpSchema)}>
        <div className="border border-black rounded flex flex-col w-full lg:w-1/3 mx-auto">
          <FormInput
            name="name"
            type="text"
            placeholder="User Name"
            label="Name"
          />
          <FormInput
            name="email"
            type="email"
            placeholder="User Email"
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            placeholder="User Password"
            label="Password"
          />
          <FormInput
            name="phone"
            placeholder="User Phone Number"
            label="Phone Number"
          />
          <FormInput
            name="address"
            placeholder="User Address"
            label="Address"
          />
        </div>
        <div className="flex justify-center">
          <SubmitButton label="Create Account" />
        </div>
      </Form>
    </div>
  );
};

export default CreateUserPage;
