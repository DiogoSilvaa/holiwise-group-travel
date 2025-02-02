import { useState } from "react";
import { DateRange } from "./types";

export function useDatepicker(initialDates?: DateRange) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempDates, setTempDates] = useState<DateRange | undefined>(initialDates);
  const [originalDates, setOriginalDates] = useState<DateRange | undefined>(initialDates);

  const handleCalendarOpenChange = (
    open: boolean,
    getCurrentDates: () => DateRange | undefined,
    setFormDates: (d: DateRange | undefined) => void
  ) => {
    if (open) {
      const currentDates = getCurrentDates() ?? {};
      setOriginalDates(currentDates);
      setTempDates(currentDates);
    } else {
      const newDate = tempDates && (tempDates.start || tempDates.end) ? tempDates : undefined;
      setFormDates(newDate);
    }
    setIsCalendarOpen(open);
  };

  const handleCancelDates = (setFormDates: (d: DateRange | undefined) => void) => {
    setFormDates(
      originalDates && (originalDates.start || originalDates.end) ? originalDates : undefined
    );
    setTempDates(undefined);
    setIsCalendarOpen(false);
  };

  return {
    isCalendarOpen,
    setIsCalendarOpen,
    tempDates,
    setTempDates,
    originalDates,
    handleCalendarOpenChange,
    handleCancelDates,
  };
}
