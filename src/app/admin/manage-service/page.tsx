"use client";
import LoadingPage from "@/app/loading";
import ActionHeader from "@/components/ui/ActionHeader/ActionHeader";
import AdditionalInformation from "@/components/ui/AdditionalInformation/AdditionalInformation";
import InfoComponent from "@/components/ui/Info/Info";
import Modal from "@/components/ui/Modal/Modal";
import CustomTable from "@/components/ui/Table/CustomTable";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useDeleteServiceMutation,
  useServicesQuery,
} from "@/redux/api/serviceApi";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ManageServicePage = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["search"] = searchTerm;
  const debounce = useDebounce(searchTerm, 600);
  if (!!debounce) query["search"] = searchTerm;

  const { data, isLoading } = useServicesQuery({ ...query });
  const [deleteService] = useDeleteServiceMutation();
  const router = useRouter();
  const columns = [
    { key: "title", label: "Title" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
    { key: "availability", label: "Status" },
    { key: "createdAt", label: "Created At" },
  ];

  if (isLoading) return <LoadingPage />;

  const handleDeleteService = async (id: string) => {
    const res = await deleteService(id).unwrap();

    if (!res) {
      toast.error("This service cannot be deleted");
      return;
    }

    if (res.id) {
      toast.success("Service Deleted");
      router.push("/admin/manage-service");
    } else toast.error("Something went wrong");
    setModalOpen(false);
  };

  const serviceData = data.map((service: any) => ({
    title: service?.title,
    price: service?.price,
    category: service?.category?.title,
    availability: service?.availability ? "Available" : "Not available",
    createdAt: format(new Date(service?.createdAt), "yyyy-MM-dd"),
    actionButton: (
      <div className="flex lg:flex-row flex-col">
        <Modal
          htmlFor={`admin/manage-service/view/${service?.id}`}
          label="View"
          btnSize="btn-xs"
          btnTheme="btn-neutral"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div>
            <InfoComponent label="Service Title" data={service?.title} />
            <InfoComponent label="Service Price" data={service?.price} />
            <InfoComponent
              label="Package Category"
              data={service?.category?.title}
            />
            <InfoComponent
              label="Status"
              data={service?.availability ? "Available" : "Not Available"}
            />
            <div className="mt-6">
              <h3>Information</h3>
              <AdditionalInformation
                information={service?.information}
                textSize="text-sm"
              />
            </div>
          </div>
        </Modal>
        <button
          className="btn btn-xs lg:mx-2 my-2 lg:my-0"
          onClick={() =>
            router.push(`/admin/manage-service/update/${service?.id}`)
          }
        >
          update
        </button>
        <Modal
          htmlFor={`admin/service/delete/${service?.id}`}
          label="Delete"
          btnSize="btn-xs"
          btnTheme="btn-error"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div>
            <h3 className="text-center">
              Service will be deleted by clicking Delete
            </h3>
            <div className="flex justify-center mt-3">
              <button
                onClick={() => handleDeleteService(service?.id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    ),
  }));

  return (
    <div>
      <ActionHeader
        label="Services"
        href="/admin/manage-service/create"
        setSearchTerm={setSearchTerm}
      />

      <div>
        <CustomTable columns={columns} data={serviceData} />
      </div>
    </div>
  );
};

export default ManageServicePage;
