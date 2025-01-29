import { FC } from "react";
import { UserIcon } from "../user-icon/user-icon";

export const TripFolder: FC = () => {
  return (
    <a>
      <div className="flex flex-col col-span-1 row-span-1 space-y-2">
        <div className="w-full bg-red-500 flex-1" />
        <h4 className="truncate font-semibold">Trip name</h4>
        <UserIcon size="small" />
      </div>
    </a>
  );
};
