"use client";

import { FC, useState } from "react";
import { Logo } from "../icons/logo";
import { Button } from "../button/button";
import { Hamburger } from "../icons/hamburger";
import { SideMenu } from "./side-menu";

export const Navbar: FC = () => {
  const [isSideOpen, setSideOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 inset-0 z-30 pl-6 pr-16 py-3 bg-white border-b lg:hidden">
        <nav className="flex w-full items-center">
          <Button
            icon={<Hamburger />}
            onClick={() => setSideOpen(true)}
            className="rounded-xl"
          />
          <Logo className="mx-auto" />
        </nav>
      </header>
      <SideMenu isSideOpen={isSideOpen} closeSide={() => setSideOpen(false)} />
    </>
  );
};
