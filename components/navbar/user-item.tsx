import { FC } from "react";

export const UserItem: FC = () => {
  return (
    <button className="flex items-center space-x-3 w-full">
      <span className="h-12 w-12 bg-purple-700 inline-flex justify-center items-center rounded-lg text-white font-medium text-2xl">
        D
      </span>
      <span className="truncate">diogonnobrega@gmail.com</span>
    </button>
  );
};
