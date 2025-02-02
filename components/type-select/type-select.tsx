import { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

interface SelectOption {
  value: string;
  text: string;
}

interface TypeSelectProps {
  options: Array<SelectOption>;
  defaultOption: SelectOption;
  setType: (v: string) => void;
  includeDefault?: boolean;
}

export const TypeSelect: FC<TypeSelectProps> = ({
  options,
  includeDefault = true,
  defaultOption,
  setType,
}) => {
  return (
    <Select onValueChange={setType}>
      <SelectTrigger>
        <SelectValue placeholder={defaultOption.text} />
      </SelectTrigger>
      <SelectContent>
        {includeDefault && (
          <SelectItem key={defaultOption.text + defaultOption.value} value={defaultOption.value}>
            {defaultOption.text}
          </SelectItem>
        )}
        {options.map(({ value, text }) => (
          <SelectItem key={value + text} value={value}>
            {text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
