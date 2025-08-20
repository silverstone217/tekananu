import LoginForm from "@/components/auth/LoginForm";
import LogoComponent from "@/components/LogoComponent";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="p-6 sm:px-8 xl:px-10">
      <Link href={"/"}>
        <LogoComponent />
      </Link>
      <div className="w-full max-w-xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold">Bienvenue, </h2>
        <p className="mt-2">
          Veuillez remplir le formulaire ci-dessous pour vous connecter.
        </p>

        {/* form */}
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
