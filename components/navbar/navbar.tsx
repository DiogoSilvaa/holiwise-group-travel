"use client";

import { FC, useState } from "react";
import { Logo } from "../icons/logo";
import { Button } from "../button";
import { SideMenu } from "./side-menu";
import { Menu } from "lucide-react";

export const Navbar: FC = () => {
  const [isSideOpen, setSideOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <header className="sticky top-0 inset-0 z-30 pl-6 pr-16 py-3 bg-white border-b">
        <nav className="flex w-full items-center">
          <Button
            variant="outline"
            onClick={() => setSideOpen(true)}
            className="rounded-xl h-12 w-12"
          >
            <Menu />
          </Button>
          <Logo className="mx-auto" />
        </nav>
      </header>
      <SideMenu isSideOpen={isSideOpen} closeSide={() => setSideOpen(false)} />
    </div>
  );
};
