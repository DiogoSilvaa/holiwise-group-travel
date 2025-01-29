"use client";

import { FC, ReactNode } from "react";
import { UserIcon } from "../user-icon/user-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Exit } from "../icons/exit";
import { Person } from "../icons/person";
import { Booking } from "../icons/booking";
import { Cog } from "../icons/cog";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../button/button";

interface DropdownItemProps {
  icon: ReactNode;
  text: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const DropdownItem: FC<DropdownItemProps> = ({
  icon,
  text,
  isDisabled,
  onClick,
}) => (
  <button onClick={onClick}>
    <DropdownMenuItem
      className={classNames(
        "text-base",
        isDisabled
          ? "text-gray-500 cursor-not-allowed pointer-events-none"
          : "bg-transparent"
      )}
    >
      {icon}
      {text}
    </DropdownMenuItem>
  </button>
);

export const UserItem: FC = () => {
  const { status, data } = useSession();

  if (status === "unauthenticated" || !data?.user?.email) {
    return (
      <Button
        className="flex items-center space-x-3 w-full"
        onClick={() => signIn("google")}
        icon={<UserIcon />}
        text="Log in"
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center space-x-3 w-full border-none"
          icon={<UserIcon email={data.user.email} />}
          text="diogonnobrega@gmail.com"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col truncate w-64 space-y-1">
        <DropdownItem icon={<Person />} text="Profile" isDisabled />
        <DropdownItem icon={<Booking />} text="Manage booking" isDisabled />
        <DropdownItem icon={<Cog />} text="Account settings" isDisabled />
        <DropdownItem icon={<Exit />} text="Log out" onClick={signOut} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
