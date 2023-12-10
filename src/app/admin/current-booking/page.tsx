"use client";
import LoadingPage from "@/app/loading";
import ActionBar from "@/components/ui/ActionHeader/ActionBar";
import ActionHeader from "@/components/ui/ActionHeader/ActionHeader";
import AdditionalInformation from "@/components/ui/AdditionalInformation/AdditionalInformation";
import AvatarComponent from "@/components/ui/Avater/Avatar";
import InfoComponent from "@/components/ui/Info/Info";
import Modal from "@/components/ui/Modal/Modal";
import CustomTable from "@/components/ui/Table/CustomTable";
import UMTable from "@/components/ui/Table/UMTable";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useBookingsByDateQuery,
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
} from "@/redux/api/bookingApi";
import { Button, DatePicker, DatePickerProps, Input } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ManageServicePage = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: slotData, isLoading: isSlotLoading } = useBookingsByDateQuery(
    selectedDate && format(selectedDate, "yyyy-MM-dd")
  );
  const [deleteBooking] = useDeleteBookingMutation();
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  if (isSlotLoading) return <LoadingPage />;

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateBookingStatus({
        id: id,
        payload: { status: status },
      }).unwrap();
      toast.success(`Status updated to "${status.toUpperCase()}"`);
      setModalOpen(false);
    } catch (error) {
      toast.success(`Something went wrong"`);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      const res = await deleteBooking(id);
      toast.success("Booking Deleted");
      setModalOpen(false);
    } catch (error) {
      toast.error("Something Went Wrong");
      setModalOpen(false);
    }
  };

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    const selectedDate = dateString ? new Date(dateString) : new Date();
    setSelectedDate(selectedDate as Date);
  };

  const getNestedValue = (obj: any, path: any) => {
    const keys = path.split(".");
    return keys.reduce(
      (acc: any, key: any) =>
        acc && acc[key] !== undefined ? acc[key] : undefined,
      obj
    );
  };

  const filteredBooking = slotData?.filter((book: any) => {
    const searchFields = [
      "user.name",
      "status",
      "makeoverService.title",
      "user.phone",
      "user.email",
    ];

    // Check if the search term matches any of the specified fields
    return searchFields.some((field) =>
      String(getNestedValue(book, field))
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });
  const columns = [
    {
      title: "User Name",
      dataIndex: "user",
      render: function (data: any) {
        return data && data.name;
      },
    },
    {
      title: "Phone No",
      dataIndex: "user",
      render: function (data: any) {
        return data && data.phone;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Appointment Time",
      dataIndex: "startTime",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Price",
      dataIndex: "makeoverService",
      render: function (data: any) {
        return data && data.price;
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div className="flex lg:flex-row flex-col">
            <Modal
              htmlFor={`admin/current-booking/view/${data?.id}`}
              label="View"
              btnSize="btn-xs"
              btnTheme="btn-neutral"
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            >
              <div className="flex justify-between">
                <div>
                  <InfoComponent label="User Name" data={data?.user.name} />
                  <InfoComponent
                    label="Contact Number"
                    data={data?.user.phone}
                  />
                  <InfoComponent label="Email" data={data?.user.email} />
                </div>
                <div>
                  <InfoComponent label="Date" data={data?.date} />
                  <InfoComponent label="Time" data={data?.startTime} />
                  <InfoComponent
                    label="Package Title"
                    data={data?.makeoverService.title}
                  />
                  <InfoComponent
                    label="Price"
                    data={`${data?.makeoverService.price} $`}
                  />
                </div>
              </div>
            </Modal>
            {data.status === "pending" && (
              <Modal
                htmlFor={`admin/current-booking/update/${data?.id}`}
                label="Confirm"
                btnSize="btn-xs"
                btnTheme="btn"
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              >
                <div>
                  <p className="font-semibold text-lg">
                    Are you sure that the booking is Completed?
                  </p>
                  <div className="mt-5 flex flex-row-reverse">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="btn btn-error btn-sm mx-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(data?.id, "confirmed")}
                      className="btn btn-accent btn-sm mx-2"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Modal>
            )}
            {data.status === "confirmed" && (
              <Modal
                htmlFor={`admin/current-booking/update/${data?.id}`}
                label="Complete"
                btnSize="btn-xs"
                btnTheme="btn-success"
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              >
                <div>
                  <p className="font-semibold text-lg">
                    Are you sure that the booking is Completed?
                  </p>
                  <div className="mt-5 flex flex-row-reverse">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="btn btn-error btn-sm mx-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(data?.id, "completed")}
                      className="btn btn-accent btn-sm mx-2"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Modal>
            )}
            {data.status !== "completed" && (
              <Modal
                htmlFor={`admin/current-booking/cancel/${data?.id}`}
                label="Cancel"
                btnSize="btn-xs"
                btnTheme="btn-error"
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              >
                <div>
                  <p className="font-semibold text-lg">
                    Are you sure to cancel this data?
                  </p>
                  <div className="mt-5 flex flex-row-reverse">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="btn btn rounded btn-sm mx-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(data?.id)}
                      className="btn btn-error rounded btn-sm mx-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        );
      },
    },
  ];
  const resetFilters = () => {
    setSearchTerm("");
  };
  return (
    <div>
      <ActionBar title="All Booking List">
        <Input
          type="text"
          size="large"
          placeholder="Search...."
          style={{ width: "20%" }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></Input>
        <div className="flex">
          <DatePicker onChange={handleDateChange} style={{ width: "100%" }} />
          {!!searchTerm && (
            <Button
              type="primary"
              size="large"
              style={{ margin: "0px 5px" }}
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <div>
        <UMTable
          columns={columns}
          loading={isSlotLoading}
          dataSource={filteredBooking}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default ManageServicePage;
