import { getUser } from "@/actions/auth";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function layout({ children }: Props) {
  const user = await getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Connectez-vous pour accéder à cette page.</p>
        <Link
          href="/connexion"
          className="bg-primary px-4 py-2 rounded hover:bg-primary/80"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div>
      {children}
      <h2>
        <span>Binevenue, </span>
        {user.email}
      </h2>
    </div>
  );
}

export default layout;
