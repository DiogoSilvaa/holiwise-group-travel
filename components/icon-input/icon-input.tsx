import { FC, ReactNode } from "react";
import { Input } from "../input";
import { ControllerRenderProps } from "react-hook-form";

interface IconInput {
  field: ControllerRenderProps<any>;
  icon?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

export const IconInput: FC<IconInput> = ({
  field,
  placeholder,
  icon,
  disabled,
}) => {
  return (
    <div className="flex has-[:disabled]:border-gray-300 has-[:disabled]:text-gray-300 items-center pl-3 h-11 space-x-0 border-black rounded-md border shadow-sm focus-within:bg-gray-100">
      {icon}
      <Input disabled={disabled} {...field} placeholder={placeholder} />
    </div>
  );
};
