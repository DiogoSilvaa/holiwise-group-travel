import { FC } from "react";
import { UserIcon } from "../user-icon/user-icon";

export const UserItem: FC = () => {
  return (
    <button className="flex items-center space-x-3 w-full">
      <UserIcon />
      <span className="truncate">diogonnobrega@gmail.com</span>
    </button>
  );
};
