"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface SessionProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
