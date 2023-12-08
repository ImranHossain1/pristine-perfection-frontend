"use client";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import React from "react";
import CommonHeading from "@/components/ui/Heading/CommonHeading";
import { useSignInMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema/auth";
import Link from "next/link";
import Heading from "@/components/ui/Heading/Heading";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

const LoginPage = () => {
  const [signIn] = useSignInMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const result = await signIn({ ...data }).unwrap();
      if (!result) {
        toast.error("Wrong User Credentials");
        return;
      }
      if (result) {
        storeUserInfo({ accessToken: result.accessToken });
        router.back();
        toast.success("Logged in");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <Heading label="Login to your account" subLabel="Login" />
      <Form submitHandler={handleSubmit} resolver={yupResolver(loginSchema)}>
        <div className=" flex flex-col w-2/3 lg:w-1/3 mx-auto">
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
          <Link href={"/signUp"} className="text-[#FFCF99] -mt-2">
            New to Out Website?
          </Link>
        </div>
        <div className="flex justify-center mt-3">
          <PrimaryButton label="Login" type="submit" />
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
