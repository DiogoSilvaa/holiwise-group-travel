"use client";

import { FC } from "react";
import { FormField, FormItem, FormControl, FormMessage } from "../form";
import { Input } from "../input";
import { Label } from "../label";
import { DatePicker } from "./date-picker";
import { DateRange } from "./types";

interface TripFormFieldsProps {
  control: any;
  tempDates: DateRange | undefined;
  setTempDates: (dates: DateRange | undefined) => void;
  isCalendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  onCancelDate: () => void;
}

export const TripFormFields: FC<TripFormFieldsProps> = ({
  control,
  tempDates,
  setTempDates,
  isCalendarOpen,
  onCalendarOpenChange,
  onCancelDate,
}) => {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }: any) => (
          <FormItem className="space-y-1">
            <Label>Name</Label>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter trip name"
                className="h-11 text-sm"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <Label>Dates (optional)</Label>
        <DatePicker
          value={tempDates}
          onChange={setTempDates}
          isOpen={isCalendarOpen}
          onOpenChange={onCalendarOpenChange}
          onCancel={onCancelDate}
        />
      </div>
    </>
  );
};
