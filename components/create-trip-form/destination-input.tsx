import { Calculator, Calendar, MapPin, Smile } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { TripPayload } from "@/app/api/trips/types";

interface CommandItem {
  id: string;
  name: string;
}

interface DestinationInputProps {
  field: ControllerRenderProps<TripPayload, "destinationId">;
  disabled: boolean;
  options: CommandItem[];
}

export const DestinationInput: FC<DestinationInputProps> = ({
  field,
  disabled,
  options,
}) => {
  const filteredCommands = options.filter((opt) =>
    opt.name.toLowerCase().includes(field.value?.toLowerCase() || "")
  );

  return (
    <div className="relative md:min-w-[450px]">
      <Command className="rounded-lg border shadow-md border-black">
        <CommandInput
          value={field.value || ""}
          onValueChange={field.onChange}
          placeholder="Where to?"
          disabled={disabled}
        />
        <CommandList className="absolute top-full left-0 right-0 mt-1 shadow-lg rounded-md border bg-popover z-50">
          {filteredCommands.length === 0 ? (
            <CommandEmpty className="bg-white h-12 flex justify-center items-center">
              <span>No destinations found.</span>
            </CommandEmpty>
          ) : (
            <>
              {filteredCommands.map((command) => (
                <CommandItem
                  key={command.name}
                  onSelect={() => field.onChange(command.id)}
                  className="bg-white h-12 text-sm font-semibold aria-selected:bg-accent aria-selected:text-accent-foreground cursor-pointer"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{command.name}</span>
                </CommandItem>
              ))}
            </>
          )}
        </CommandList>
      </Command>
    </div>
  );
};
