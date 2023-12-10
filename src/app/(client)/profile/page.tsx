"use client";
import LoadingPage from "@/app/loading";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
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
  const { data, isLoading } = useProfileQuery(email as string);
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
    try {
      const res = await editProfile({ id: email, data: data });
      res && toast.success("Profile updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
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
            className="w-24 h-24 lg:w-56 lg:h-56 rounded border-2 border-solid border-[#ffcf99]"
          />
        </div>

        {/* profile information  */}
        <div className="lg:ml-10 md:text-xl">
          <h1 className="font-normal">{data?.name}</h1>
          <p className="text-gray-700 mt-1 text-base">{data?.email}</p>

          <div className="flex items-center mt-8">
            <CiLocationOn className="text-xl" />
            <div className="text-lg ml-2">{data?.address}</div>
          </div>

          <div className="flex items-center mt-2 mb-3">
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
              <div className="rounded flex flex-col w-5/6 mx-auto">
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
                <PrimaryButton label="Update" type="submit" />
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
