"use client";
import LoadingPage from "@/app/loading";
import ActionHeader from "@/components/ui/ActionHeader/ActionHeader";
import AdditionalInformation from "@/components/ui/AdditionalInformation/AdditionalInformation";
import InfoComponent from "@/components/ui/Info/Info";
import Modal from "@/components/ui/Modal/Modal";
import CustomTable from "@/components/ui/Table/CustomTable";
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/categoryApi";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ManageCategoryPage = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const { data, isLoading } = useCategoriesQuery({ limit: 100 });
  const [deleteCategory] = useDeleteCategoryMutation();
  const router = useRouter();
  const columns = [
    { key: "image", label: "Image" },
    { key: "title", label: "Title" },
    { key: "createdAt", label: "Created At" },
  ];

  if (isLoading) return <LoadingPage />;
  const handleDeleteCategory = async (id: string) => {
    const res = await deleteCategory(id).unwrap();
    if (res.id) {
      toast.success("Category Deleted");
      router.push("/super-super-admin/manage-category");
    } else toast.error("Something went wrong");
    setModalOpen(false);
  };
  const categoryData = data?.map((category: any) => ({
    image: category?.image,
    title: category?.title,
    createdAt: format(new Date(category?.createdAt), "yyyy-MM-dd"),
    id: category.id,
    actionButton: (
      <div className="flex lg:flex-row flex-col">
        <Modal
          htmlFor={`super-admin/manage-category/view/${category?.id}`}
          label="View"
          btnSize="btn-xs"
          btnTheme="btn-neutral"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div>
            <InfoComponent
              label="Package Category Title"
              data={category?.title}
            />
            <div className="mt-6">
              <h3>Information</h3>
              <AdditionalInformation
                information={category?.information}
                textSize="text-sm"
              />
            </div>
          </div>
        </Modal>
        <button
          className="btn btn-xs lg:mx-2 my-2 lg:my-0"
          onClick={() =>
            router.push(`/super-admin/manage-category/update/${category?.id}`)
          }
        >
          update
        </button>
        <Modal
          htmlFor={`super-admin/category/delete/${category?.id}`}
          label="Delete"
          btnSize="btn-xs"
          btnTheme="btn-error"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div>
            <h3 className="text-center">
              Category will be deleted by clicking Delete
            </h3>
            <div className="flex justify-center mt-3">
              <button
                onClick={() => handleDeleteCategory(category?.id)}
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
        label="Categories"
        href="/super-super-admin/manage-category/create"
        doSearch={false}
      />

      <div>
        <CustomTable columns={columns} data={categoryData} />
      </div>
    </div>
  );
};

export default ManageCategoryPage;
