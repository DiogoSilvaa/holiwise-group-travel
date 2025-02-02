"use client";

import { FC, ReactNode } from "react";
import { UserIcon } from "../user-icon/user-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../button";
import Image from "next/image";
import { Briefcase, CogIcon, LogOut, User } from "lucide-react";

interface DropdownItemProps {
  icon: ReactNode;
  text: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const DropdownItem: FC<DropdownItemProps> = ({ icon, text, isDisabled, onClick }) => (
  <DropdownMenuItem
    onClick={onClick}
    className={classNames(
      "text-base hover:bg-gray-100 h-11",
      isDisabled ? "text-gray-500 cursor-not-allowed pointer-events-none" : "cursor-pointer"
    )}
  >
    {icon}
    {text}
  </DropdownMenuItem>
);

export const UserItem: FC = () => {
  const { status, data } = useSession();

  if (status === "unauthenticated" || !data?.user?.email || !data.user.image) {
    return (
      <Button
        className="flex text-base items-center w-full max-w-72 h-12"
        variant="outline"
        onClick={() => signIn("google")}
      >
        <Image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google Icon"
          width={24}
          priority
          height={24}
          sizes="15vw"
        />
        <span>Sign in with Google</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex justify-start space-x-1 w-full h-fit" variant="ghost">
          <UserIcon img_src={data.user.image} />
          <span className="truncate">{data.user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col truncate w-64 xl:w-52 space-y-1">
        <DropdownItem icon={<User strokeWidth="1" />} text="Profile" isDisabled />
        <DropdownItem icon={<Briefcase strokeWidth="1" />} text="Manage booking" isDisabled />
        <DropdownItem icon={<CogIcon strokeWidth="1" />} text="Account settings" isDisabled />
        <DropdownItem icon={<LogOut strokeWidth="1" />} text="Log out" onClick={signOut} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
