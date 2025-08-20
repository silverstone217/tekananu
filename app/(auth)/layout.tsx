import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function layout({ children }: Props) {
  const user = await getUser();

  if (user) {
    redirect("/");
  }

  return <div>{children}</div>;
}

export default layout;
