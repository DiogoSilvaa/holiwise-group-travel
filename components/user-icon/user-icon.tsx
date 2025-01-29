import classNames from "classnames";
import { FC } from "react";
import { Person } from "../icons/person";

interface UserIconProps {
  email?: string;
  size?: "small" | "normal";
}

export const UserIcon: FC<UserIconProps> = ({ email, size = "normal" }) => {
  const isUnknownUser = !email;
  const firstLetter = email?.[0].toUpperCase();
  return (
    <span
      className={classNames(
        "bg-purple-700 inline-flex justify-center items-center rounded-lg font-medium",
        size === "normal" ? "h-12 w-12 text-2xl" : "h-8 w-8 text-base",
        isUnknownUser
          ? "bg-transparent border border-gray-300"
          : "bg-purple-700 text-white"
      )}
    >
      {isUnknownUser ? <Person /> : firstLetter}
    </span>
  );
};
