"use client";
import LoadingPage from "@/app/loading";
import DatePickerComponent from "@/components/ui/DatePicker/DatePicker";
import Form from "@/components/ui/Forms/Form";
import FormInput from "@/components/ui/Forms/FormInput";
import SubmitButton from "@/components/ui/Forms/SubmitButton";
import Redirect from "@/components/ui/Redirect/Redirect";
import {
  useBookServiceMutation,
  useBookingsByDateQuery,
} from "@/redux/api/bookingApi";
import { useSingleServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import React, { useState } from "react";
import { format } from "date-fns";
import { slotOptions } from "@/constants/slotOptions";
import { checkAvailableSlots } from "@/utils/chechAvailableSlots";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Heading from "@/components/ui/Heading/Heading";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import ServiceDetailsCard from "@/components/ui/Service/ServiceDetailsCard";
import { useProfileQuery } from "@/redux/api/profileApi";

const BookServicePage = ({ params }: { params: any }) => {
  const { serviceId } = params;
  const { data, isLoading } = useSingleServiceQuery(serviceId);
  const { userId: email } = getUserInfo() as any;
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [slot, setSlot] = useState("");
  const { data: slotData, isLoading: isSlotLoading } = useBookingsByDateQuery(
    selectedDate && format(selectedDate, "yyyy-MM-dd")
  );
  const { data: userData, isLoading: isUserLoading } = useProfileQuery(email);
  const [bookService] = useBookServiceMutation();
  const router = useRouter();

  if (isLoading || isSlotLoading || isUserLoading) return <LoadingPage />;

  const handleSubmit = async (data: any) => {
    delete data?.name;
    delete data?.email;
    if (!slot) {
      toast.error("Please select a Slot for booking");
      return;
    } else if (!selectedDate) {
      toast.error("Please select a Date for booking");
      return;
    }
    const selectedSlot = JSON.parse(slot);
    data.startTime = selectedSlot?.startTime;
    data.endTime = selectedSlot?.endTime;
    data.date = format(selectedDate, "yyyy-MM-dd");
    data.userId = userData.id;
    data.makeoverServiceId = serviceId;
    console.log(data);
    const res = await bookService(data).unwrap();

    if (res.id) {
      toast.success("Service Booked, wait for the confirmation");
      router.push("/booking");
    } else {
      toast.error("Try different slot to book");
    }
  };

  const availableSlots = checkAvailableSlots(slotOptions, slotData);

  return (
    <Redirect>
      <div>
        <Heading label={data?.title} subLabel="Book your service" />
        <ServiceDetailsCard data={data} bookBtn={false} />

        {/* form  */}
        <div className="mt-8 md:mt-14">
          <Heading
            label="Select Booking Slot & Provide Information"
            subLabel="Booking"
          />
          <Form submitHandler={handleSubmit} doReset={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-start space-y-8 md:space-y-0">
              <div className="">
                <div className="mb-2 text-xl md:text-2xl text-[#92140C]">
                  Pick a date for booking
                </div>

                <DatePickerComponent
                  selectedDate={selectedDate as Date}
                  setSelectedDate={setSelectedDate}
                />

                <div className="mb-3 text-xl md:text-2xl text-[#92140C]">
                  Pick a time for booking
                </div>

                <select
                  className="select w-56  md:w-72  rounded border border-solid border-[#FFCF99] focus:outline-none"
                  onChange={(e) => setSlot(e?.target?.value)}
                  disabled={!selectedDate}
                >
                  <option disabled selected>
                    Pick a time slot
                  </option>
                  {availableSlots.map((option: any, index: number) => (
                    <option
                      key={index}
                      value={JSON.stringify({
                        startTime: option?.startTime,
                        endTime: option?.endTime,
                      })}
                    >
                      {option.startTime} - {option.endTime}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <div className="mb-3 md:mb-5 text-xl md:text-2xl text-[#92140C]">
                  Give Your Information
                </div>
                <FormInput
                  name="name"
                  label="Your Name"
                  disabled={true}
                  value={userData?.name}
                />
                <FormInput
                  name="email"
                  label="Email Address"
                  disabled={true}
                  value={userData?.email}
                />
                <FormInput
                  name="contactNo"
                  value={userData?.phone}
                  label="Contact Number"
                  disabled={true}
                />
                <FormInput
                  name="alternativeContactNo"
                  label="Alternative Contact Number"
                />
                <PrimaryButton label="Book" type="submit" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Redirect>
  );
};

export default BookServicePage;
