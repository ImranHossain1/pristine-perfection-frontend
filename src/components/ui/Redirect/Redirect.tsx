import LoadingPage from "@/app/loading";
import { getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode | React.ReactElement;
  role?: string;
}

const Redirect = ({ children, role }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = getUserInfo() as any;
  const router = useRouter();

  console.log(user?.role);
  console.log(role);
  useEffect(() => {
    if (!user.role) {
      router.push("/login");
    } else if (role != user?.role) {
      router.push("/");
    }

    setIsLoading(false);
  }, [router, user?.email, user?.role, role]);

  if (isLoading) return <LoadingPage />;
  return <div>{children}</div>;
};

export default Redirect;
