"use client";
import LoadingPage from "@/app/loading";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import Modal from "@/components/ui/Modal/Modal";
import {
  useEditProfileMutation,
  useProfileQuery,
} from "@/redux/api/profileApi";
import { profileSchema } from "@/schema/profile";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";

const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(true);
  const { email } = getUserInfo() as any;
  const router = useRouter();
  const { data, isLoading } = useProfileQuery({});
  const [editProfile] = useEditProfileMutation();

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
    setLoading(false);
  }, [router, email]);

  if (loading || isLoading) return <LoadingPage />;

  const defaultValues = {
    name: data?.name,
    address: data?.address,
    phone: data?.phone,
  };

  const handleSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await editProfile(data);
      res && toast.success("Profile updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex">
        {/* profile image  */}
        <div className="">
          <Image
            src={
              data?.profileImg
                ? data?.profileImg
                : "https://res.cloudinary.com/dk9iz6r2z/image/upload/v1702046564/gbifw5rwo76tidd6f3x4.jpg"
            }
            alt=""
            width={300}
            height={300}
            className="w-24 h-24 lg:w-56 lg:h-56"
          />
        </div>

        {/* profile information  */}
        <div className="lg:ml-10 ">
          <h1 className="font-normal">{data?.name}</h1>
          <div className="bg-black bg-opacity-90 px-2 py-1 w-fit text-gray-200 my-1 uppercase">
            {data?.role}
          </div>
          <p className="text-gray-700 mt-1 text-base">{data?.email}</p>

          <div className="flex items-center mt-8">
            <CiLocationOn className="text-xl" />
            <div className="text-lg ml-2">{data?.address}</div>
          </div>

          <div className="flex items-center mt-2">
            <CiPhone className="text-xl" />
            <div className="text-lg ml-2">{data?.phone}</div>
          </div>

          {/* The button to open modal */}

          {/* Put this part before </body> tag */}
          <Modal
            htmlFor="profile"
            label="Edit Profile"
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <Form
              submitHandler={handleSubmit}
              resolver={yupResolver(profileSchema)}
              defaultValues={defaultValues}
            >
              <div className="border border-black rounded flex flex-col w-5/6 mx-auto">
                <FormInput
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  label="Name"
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
              </div>
              <div className="flex justify-center">
                <SubmitButton label="Update" />
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
