import { MapPin } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { FC, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { TripPayload } from "@/app/api/trips/types";
import classNames from "classnames";

interface CommandItem {
  id: string;
  name: string;
}

interface DestinationInputProps {
  field: ControllerRenderProps<TripPayload, "destinationId">;
  options: CommandItem[];
}

export const DestinationInput: FC<DestinationInputProps> = ({
  field,
  options,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCommands = options.filter((opt) =>
    opt.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (command: CommandItem) => {
    setInputValue(command.name);
    field.onChange(command.id);
    setIsOpen(false);
  };

  return (
    <div className="relative md:min-w-[450px]">
      <Command className="rounded-lg border has-[:focus]:border-black">
        <CommandInput
          value={inputValue}
          onValueChange={(value) => {
            setInputValue(value);
            if (!isOpen) setIsOpen(true);
          }}
          placeholder="Choose your destination"
          className="h-12"
        />
        <CommandList
          className={classNames(
            "absolute top-full left-0 right-0 mt-1 z-50",
            isOpen ? "shadow-lg rounded-md border bg-popover" : ""
          )}
        >
          {isOpen &&
            (filteredCommands.length === 0 ? (
              <CommandEmpty className="bg-white h-12 flex justify-center items-center">
                <span>No destinations found.</span>
              </CommandEmpty>
            ) : (
              <>
                {filteredCommands.map((command) => (
                  <CommandItem
                    key={command.id}
                    value={command.name}
                    onSelect={() => handleSelect(command)}
                    className="bg-white h-12 text-sm font-semibold aria-selected:bg-accent aria-selected:text-accent-foreground cursor-pointer"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{command.name}</span>
                  </CommandItem>
                ))}
              </>
            ))}
        </CommandList>
      </Command>
    </div>
  );
};
