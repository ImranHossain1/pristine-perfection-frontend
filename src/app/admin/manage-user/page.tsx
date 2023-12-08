"use client";
import LoadingPage from "@/app/loading";
import ActionHeader from "@/components/ui/ActionHeader/ActionHeader";
import InfoComponent from "@/components/ui/Info/Info";
import Modal from "@/components/ui/Modal/Modal";
import CustomTable from "@/components/ui/Table/CustomTable";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useUsersQuery,
} from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ManageUserPage = () => {
  const [modalOpen, setModalOpen] = useState(true);

  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["search"] = searchTerm;
  const debounce = useDebounce(searchTerm, 600);
  if (!!debounce) query["search"] = searchTerm;
  const { data, isLoading } = useUsersQuery({ ...query });
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const router = useRouter();
  const loggedInUser = getUserInfo() as any;

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "role", label: "User Role" },
  ];

  if (isLoading) return <LoadingPage />;

  const handleDeleteUser = async (id: string) => {
    const res = await deleteUser(id).unwrap();
    if (!res) {
      toast.error("This User cannot be deleted");
      return;
    }
    if (res.id) {
      toast.success("User Deleted");
      router.push("/admin/manage-user");
    } else toast.error("Something went wrong");
    setModalOpen(false);
  };

  const handlePromoteToAdmin = async (id: string) => {
    try {
      const res = await updateUserRole({
        id: id,
        payload: { role: "admin" },
      }).unwrap();

      toast.success("User Promoted to Admin");
      router.push("/admin/manage-user");
    } catch (error) {
      toast.error("Something went wrong");
      return;
    }

    setModalOpen(false);
  };

  const handleDemoteToClient = async (id: string) => {
    try {
      const res = await updateUserRole({
        id: id,
        payload: { role: "client" },
      }).unwrap();

      toast.success("User Demoted to Client");
      router.push("/admin/manage-user");
    } catch (error) {
      toast.error("Something went wrong");
      return;
    }

    setModalOpen(false);
  };

  const userData = data?.map((user: any) => ({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    role: user?.role,
    actionButton: (
      <div className="flex lg:flex-row flex-col">
        <Modal
          htmlFor={`admin/manage-user/view/${user?.id}`}
          label="View"
          btnSize="btn-xs"
          btnTheme="btn-neutral"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <div>
            <InfoComponent label="Name" data={user?.name} />
            <InfoComponent label="Email" data={user?.email} />
            <InfoComponent label="Phone" data={user?.phone} />
            <InfoComponent label="Address" data={user?.address} />
            <InfoComponent label="Role" data={user?.role} />
            <InfoComponent
              label="Created At"
              data={format(new Date(user?.createdAt), "yyyy-MM-dd")}
            />
          </div>
        </Modal>
        {loggedInUser.role !== "super_admin" && user?.role === "client" && (
          <button
            className="btn btn-xs lg:mx-2 my-1 lg:my-0"
            onClick={() => router.push(`/admin/manage-user/update/${user?.id}`)}
          >
            update
          </button>
        )}
        {loggedInUser.role === "super_admin" &&
          user?.role !== "super_admin" && (
            <button
              className="btn btn-xs lg:mx-2 my-1 lg:my-0"
              onClick={() =>
                router.push(`/admin/manage-user/update/${user?.id}`)
              }
            >
              update
            </button>
          )}
        {loggedInUser.role === "super_admin" &&
          user?.role !== "super_admin" && (
            <Modal
              htmlFor={`admin/manage-user/promote/${user?.id}`}
              label="Role Update"
              btnSize="btn-xs"
              btnTheme="btn-outline lg:mr-2 lg:mb-0 mb-1"
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            >
              <div>
                <h3 className="text-center">
                  Update user role of ({user?.email})
                </h3>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => handlePromoteToAdmin(user?.id)}
                    className="btn btn-info btn-sm"
                  >
                    Promote
                  </button>
                  <button
                    onClick={() => handleDemoteToClient(user?.id)}
                    className="btn btn-warning btn-sm"
                  >
                    Demote
                  </button>
                </div>
              </div>
            </Modal>
          )}
        {loggedInUser.role !== "super_admin" && user?.role === "client" && (
          <Modal
            htmlFor={`admin/manage-user/promote/${user?.id}`}
            label="Promote"
            btnSize="btn-xs"
            btnTheme="btn-outline lg:mr-2 lg:mb-0 mb-1"
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <div>
              <h3 className="text-center">Promote ({user?.email}) to Admin</h3>
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => handlePromoteToAdmin(user?.id)}
                  className="btn btn-info btn-sm"
                >
                  Promote
                </button>
              </div>
            </div>
          </Modal>
        )}
        {loggedInUser.role === "super_admin" &&
          user?.role !== "super_admin" && (
            <Modal
              htmlFor={`super-admin/manage-user/delete/${user?.id}`}
              label="Delete"
              btnSize="btn-xs"
              btnTheme="btn-error"
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            >
              <div>
                <h3 className="text-center">
                  User will be deleted by clicking Delete
                </h3>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => handleDeleteUser(user?.id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Modal>
          )}
        {loggedInUser.role !== "super_admin" && user?.role === "client" && (
          <Modal
            htmlFor={`admin/manage-user/delete/${user?.id}`}
            label="Delete"
            btnSize="btn-xs"
            btnTheme="btn-error"
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <div>
              <h3 className="text-center">
                User will be deleted by clicking Delete
              </h3>
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => handleDeleteUser(user?.id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    ),
  }));

  return (
    <div>
      <ActionHeader
        label="Users"
        href="/admin/manage-user/create"
        doSearch={false}
      />

      <div>
        <CustomTable columns={columns} data={userData} />
      </div>
    </div>
  );
};

export default ManageUserPage;
