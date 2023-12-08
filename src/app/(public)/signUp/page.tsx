"use client";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import React from "react";
import CommonHeading from "@/components/ui/Heading/CommonHeading";
import { useSignUpMutation } from "@/redux/api/authApi";
import { toast } from "react-hot-toast";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/schema/auth";
import Link from "next/link";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import Heading from "@/components/ui/Heading/Heading";

const SignUpPage = () => {
  const [signUp] = useSignUpMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const result = await signUp({ ...data }).unwrap();
      if (!result) {
        toast.error("User Already exist");
        return;
      }
      if (result) {
        storeUserInfo({ accessToken: result.accessToken });
        router.push("/");
        toast.success("Account Created");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <Heading label="Create an account" subLabel="Sign up" />
      <Form submitHandler={handleSubmit} resolver={yupResolver(signUpSchema)}>
        <div className="border border-black rounded flex flex-col w-2/3 lg:w-1/3 mx-auto">
          <FormInput
            name="name"
            type="text"
            placeholder="Your Name"
            label="Name"
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Your Email"
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
          />
          <FormInput
            name="phone"
            placeholder="Your Phone Number"
            label="Phone Number"
          />
          <FormInput
            name="address"
            placeholder="Your Address"
            label="Address"
          />
          <Link href={"/login"} className="text-[#FFCF99] -mt-2">
            Already have an Account?
          </Link>
        </div>
        <div className="flex justify-center mt-3">
          <PrimaryButton label="Create Account" type="submit" />
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
