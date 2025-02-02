import classNames from "classnames";
import { FC, ReactNode } from "react";

interface MenuItemProps {
  icon: ReactNode;
  text: string;
  isActive: boolean;
  isDisabled?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, text, isActive, isDisabled }) => {
  return (
    <a
      href=""
      className={classNames(
        "flex h-12 items-center px-3 py-2 text-sm rounded-xl space-x-2",
        !isActive || isDisabled
          ? "text-gray-500 bg-transparent font-medium"
          : "text-black bg-primary-500 font-semibold",
        isDisabled && "cursor-not-allowed pointer-events-none"
      )}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </a>
  );
};
