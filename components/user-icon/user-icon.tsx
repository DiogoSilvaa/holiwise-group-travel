import classNames from "classnames";
import { FC } from "react";

interface UserIconProps {
  size?: "small" | "normal";
}

export const UserIcon: FC<UserIconProps> = ({ size = "normal" }) => {
  return (
    <span
      className={classNames(
        "bg-purple-700 inline-flex justify-center items-center rounded-lg text-white font-medium",
        size === "normal" ? "h-12 w-12 text-2xl" : "h-8 w-8 text-base"
      )}
    >
      D
    </span>
  );
};
