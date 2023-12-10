"use client";
import LoadingPage from "@/app/loading";
import ActionHeader from "@/components/ui/ActionHeader/ActionHeader";
import AdditionalInformation from "@/components/ui/AdditionalInformation/AdditionalInformation";
import InfoComponent from "@/components/ui/Info/Info";
import Modal from "@/components/ui/Modal/Modal";
import CustomTable from "@/components/ui/Table/CustomTable";
import { useBlogsQuery, useDeleteBlogMutation } from "@/redux/api/blogApi";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ManageBlogPage = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const { data, isLoading } = useBlogsQuery({ limit: 1000 });
  const [deleteBlog] = useDeleteBlogMutation();
  const router = useRouter();
  const columns = [
    { key: "title", label: "Title" },
    { key: "createdAt", label: "Created At" },
  ];

  if (isLoading) return <LoadingPage />;

  const handleDeleteBlog = async (id: string) => {
    const res = await deleteBlog(id).unwrap();
    console.log(res);
    if (res.id) {
      toast.success("Blog Deleted");
      router.push("/super-admin/manage-blog");
    } else toast.error("Something went wrong");
    setModalOpen(false);
  };

  const blogData = data.map((blog: any) => ({
    title: blog.title,
    createdAt: format(new Date(blog?.createdAt), "yyyy-MM-dd"),
    id: blog.id,
    actionButton: (
      <div className="flex lg:flex-row flex-col">
        <Modal
          htmlFor={`super-admin/manage-blog/view/${blog?.id}`}
          label="View"
          btnSize="btn-xs"
          btnTheme="btn-neutral"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div>
            <InfoComponent label="Blog Title" data={blog?.title} />
            <InfoComponent label="Blog Content" data={blog?.content} />
          </div>
        </Modal>
        <Modal
          htmlFor={`super-admin/blog/delete/${blog?.id}`}
          label="Delete"
          btnSize="btn-xs"
          btnTheme="btn-error lg:ml-2 mt-1 lg:mt-0"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div>
            <h3 className="text-center">
              Blog will be deleted by clicking Delete
            </h3>
            <div className="flex justify-center mt-3">
              <button
                onClick={() => handleDeleteBlog(blog?.id)}
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
        label="Blogs"
        href="/super-admin/manage-blog/create"
        doSearch={false}
      />

      <div>
        <CustomTable columns={columns} data={blogData} />
      </div>
    </div>
  );
};

export default ManageBlogPage;
