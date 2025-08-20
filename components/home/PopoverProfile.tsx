"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import AvatarUser from "../AvatarUser";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { LogOut, User, Settings, Mail } from "lucide-react";

const PopoverProfile = () => {
  const { user } = useCurrentUser();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/" });
      toast.success("Déconnexion réussie");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="focus:outline-none">
          <AvatarUser name={user.name} image={user.image} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-64 rounded-2xl shadow-lg p-4 space-y-4  "
      >
        {/* User Info */}
        <div className="flex items-center gap-3">
          <AvatarUser name={user.name} image={user.image} />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-gray-200 capitalize">
              {user.name ?? "Utilisateur"}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Mail size={14} className="text-gray-400" />
              {user.email}
            </span>
          </div>
        </div>

        <Separator />

        {/* Links */}
        <div className="flex flex-col space-y-2 text-sm">
          <Link
            href="/profil"
            className="flex items-center gap-2 px-2 py-1.5 
            rounded-lg hover:bg-gray-100 transition dark:hover:bg-gray-700"
          >
            <User size={16} />
            Mon profil
          </Link>
          <Link
            href="/parametres"
            className="flex items-center gap-2 px-2 py-1.5 
            rounded-lg hover:bg-gray-100 transition dark:hover:bg-gray-700"
          >
            <Settings size={16} />
            Paramètres
          </Link>
        </div>

        <Separator />

        {/* Logout */}
        <Button
          variant="destructive"
          className="w-full flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Déconnexion
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverProfile;
