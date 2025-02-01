import { MapPin } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem as CommandItemComponent,
  CommandList,
} from "../command";
import { FC, useState, useRef, useEffect } from "react";
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
  const [selectedCommand, setSelectedCommand] = useState<CommandItem | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCommands = options.filter((opt) =>
    opt.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (command: CommandItem) => {
    setInputValue(command.name);
    setSelectedCommand(command);
    field.onChange(command.id);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      if (!selectedCommand) {
        setInputValue("");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedCommand]);

  return (
    <div className="relative md:min-w-[450px]" ref={containerRef}>
      <Command className="rounded-lg border has-[:focus]:border-black">
        <CommandInput
          value={inputValue}
          onValueChange={(value) => {
            setInputValue(value);
            if (!isOpen) {
              setIsOpen(true);
            }
            setSelectedCommand(null);
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
                  <CommandItemComponent
                    key={command.id}
                    value={command.name}
                    onSelect={() => handleSelect(command)}
                    className="bg-white h-12 text-sm font-semibold aria-selected:bg-accent aria-selected:text-accent-foreground cursor-pointer"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{command.name}</span>
                  </CommandItemComponent>
                ))}
              </>
            ))}
        </CommandList>
      </Command>
    </div>
  );
};
