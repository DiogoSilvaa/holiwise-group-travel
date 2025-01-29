import { FC, ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-12 w-12 inline-flex items-center justify-center gap-2 border-gray-300 border rounded-xl"
    >
      {icon}
    </button>
  );
};
