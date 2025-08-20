// hooks/useCurrentUser.ts
"use client";

import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export function useCurrentUser() {
  const { data: session, status } = useSession();

  const user = session?.user as Session["user"] | null;

  return {
    user, // ton utilisateur (ou null si pas connecté)
    isLoading: status === "loading",
    isAuthenticated: !!user,
  };
}
