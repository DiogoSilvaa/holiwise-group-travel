import classNames from "classnames";
import { FC, ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ icon, onClick, className, text }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "h-12 w-12 inline-flex items-center text-center justify-center gap-1 border-gray-300 border",
        className
      )}
    >
      {icon}
      {text && (
        <span className="text-sm relative bottom-[1px] truncate">{text}</span>
      )}
    </button>
  );
};
