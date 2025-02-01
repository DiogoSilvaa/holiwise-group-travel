import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { DateRange } from "./types";

interface DatePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
}

export const DatePicker = ({
  value = {},
  onChange,
  isOpen,
  onOpenChange,
  onCancel,
}: DatePickerProps) => (
  <Popover open={isOpen} onOpenChange={onOpenChange}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className="justify-start h-12 border-gray-300 w-full"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value?.start && value?.end ? (
          `${format(value.start, "MMM dd")} - ${format(value.end, "MMM dd")}`
        ) : (
          <span className="text-gray-500">Select dates</span>
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="range"
        selected={{ from: value.start, to: value.end }}
        onSelect={(range) =>
          onChange({
            start: range?.from,
            end: range?.to,
          })
        }
        initialFocus
      />
      <div className="flex gap-2 p-2 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => onOpenChange(false)}
          className="flex-1"
        >
          Confirm
        </Button>
      </div>
    </PopoverContent>
  </Popover>
);
