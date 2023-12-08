"use client";
import Form from "@/components/ui/Forms/Form";
import React from "react";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendFeedbackMutation } from "@/redux/api/feedbackApi";
import { feedbackSchema } from "@/schema/feedback";
import FormTextArea from "@/components/ui/Forms/FormTextArea";
import { getUserInfo } from "@/services/auth.service";
import HeadingStart from "@/components/ui/Heading/HeadingStart";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

const FeedbackPage = () => {
  const [sendFeedback] = useSendFeedbackMutation();
  const { userId } = getUserInfo() as any;

  const handleSubmit = async (data: any) => {
    try {
      data.userId = userId;
      const result = await sendFeedback({ ...data }).unwrap();
      if (result.id) {
        toast.success("Thanks for your feedback");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <HeadingStart label="Send us your thoughts" subLabel="Feedback" />
      <Form submitHandler={handleSubmit} resolver={yupResolver(feedbackSchema)}>
        <div className="border border-black rounded flex flex-col mx-auto">
          <FormTextArea
            name="comment"
            type="text"
            placeholder="Write your suggestion or feedback"
            size="lg"
          />
        </div>
        <div className="">
          <PrimaryButton label="Submit" type="submit" />
        </div>
      </Form>
    </div>
  );
};

export default FeedbackPage;
