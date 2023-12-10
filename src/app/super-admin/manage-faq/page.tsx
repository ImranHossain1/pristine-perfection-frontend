"use client";
import LoadingPage from "@/app/loading";
import ActionHeader from "@/components/ui/ActionHeader/ActionHeader";
import AdditionalInformation from "@/components/ui/AdditionalInformation/AdditionalInformation";
import InfoComponent from "@/components/ui/Info/Info";
import Modal from "@/components/ui/Modal/Modal";
import CustomTable from "@/components/ui/Table/CustomTable";
import { useDeleteFAQMutation, useFAQsQuery } from "@/redux/api/faqApi";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ManageFAQPage = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const { data, isLoading } = useFAQsQuery({ limit: 1000 });
  const [deleteFAQ] = useDeleteFAQMutation();
  const router = useRouter();
  const columns = [
    { key: "question", label: "Question" },
    { key: "createdAt", label: "Created At" },
  ];

  if (isLoading) return <LoadingPage />;

  const handleDeleteFAQ = async (id: string) => {
    const res = await deleteFAQ(id).unwrap();
    console.log(res);
    if (res.id) {
      toast.success("FAQ Deleted");
      router.push("/super-admin/manage-faq");
    } else toast.error("Something went wrong");
    setModalOpen(false);
  };

  const faqData = data.map((faq: any) => ({
    question: faq.question,
    createdAt: format(new Date(faq?.createdAt), "yyyy-MM-dd"),
    actionButton: (
      <div className="flex lg:flex-row flex-col">
        <Modal
          htmlFor={`super-admin/manage-faq/view/${faq?.id}`}
          label="View"
          btnSize="btn-xs"
          btnTheme="btn-neutral"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div>
            <InfoComponent label="Question" data={faq?.question} />
            <InfoComponent label="Answer" data={faq?.answer} />
          </div>
        </Modal>
        <Modal
          htmlFor={`super-admin/faq/delete/${faq?.id}`}
          label="Delete"
          btnSize="btn-xs"
          btnTheme="btn-error lg:ml-2 mt-1 lg:mt-0"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div>
            <h3 className="text-center">
              FAQ will be deleted by clicking Delete
            </h3>
            <div className="flex justify-center mt-3">
              <button
                onClick={() => handleDeleteFAQ(faq?.id)}
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
        label="FAQs"
        href="/super-admin/manage-faq/create"
        doSearch={false}
      />

      <div>
        <CustomTable columns={columns} data={faqData} />
      </div>
    </div>
  );
};

export default ManageFAQPage;
