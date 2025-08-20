"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarUserProps = {
  name?: string | null;
  image?: string | null;
};

const AvatarUser = ({ name, image }: AvatarUserProps) => {
  const initials = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <Avatar>
      {image ? (
        <AvatarImage src={image} alt="User Avatar" />
      ) : (
        <AvatarFallback className="font-bold shadow-2xl">
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AvatarUser;
