"use client";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import FormTextArea from "@/components/ui/Forms/FormTextArea";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import { usePostFAQMutation } from "@/redux/api/faqApi";
import { faqSchema } from "@/schema/faq";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const CreateFAQPage = () => {
  const [postFAQ] = usePostFAQMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const res = await postFAQ(data).unwrap();
    if (res.id) {
      toast.success("FAQ Posted");
      router.push("/admin/manage-faq");
    } else toast.error("Something went wrong");
  };

  return (
    <div>
      <h2 className="mb-4">Post FAQ</h2>
      <div className="lg:w-2/3">
        <Form
          submitHandler={handleSubmit}
          doReset={false}
          resolver={yupResolver(faqSchema)}
        >
          <FormInput name="question" label="Question" placeholder="Question" />
          <FormTextArea
            name="answer"
            label="Answer"
            placeholder="Answer"
            size="lg"
          />

          {/* ends here  */}
          <SubmitButton label="Post" />
        </Form>
      </div>
    </div>
  );
};

export default CreateFAQPage;
