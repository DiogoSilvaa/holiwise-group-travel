"use client";

import { FC, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../form";
import { DatePicker } from "./date-picker";
import { formSchema } from "./validation";
import { DateRange } from "./types";
import { Button } from "../button";
import { Label } from "../label";
import { TripPayload } from "@/app/api/trips/types";
import { useCreateTrip } from "@/hooks/trip";
import { DestinationInput } from "./destination-input";
import { useFetchDestinations } from "@/hooks/destination";
import { Input } from "../input";
import { FormInput } from "lucide-react";

interface CreateTripFormProps {
  children: ReactNode;
}

export const CreateTripForm: FC<CreateTripFormProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempDates, setTempDates] = useState<DateRange>({});
  const [originalDates, setOriginalDates] = useState<DateRange>({});
  const { mutate } = useCreateTrip();
  const { data: dests } = useFetchDestinations();
  const form = useForm<TripPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationId: "",
      date: undefined,
      name: "",
    },
  });

  const handleCalendarOpen = (open: boolean) => {
    if (open) {
      const currentDates = form.getValues("date") ?? {};
      setOriginalDates(currentDates);
      setTempDates(currentDates);
    } else {
      handleDateConfirm();
    }
    setIsCalendarOpen(open);
  };

  const handleDateConfirm = () => {
    const newDate = tempDates.start || tempDates.end ? tempDates : undefined;
    form.setValue("date", newDate);
    setIsCalendarOpen(false);
  };

  const handleDateCancel = () => {
    form.setValue(
      "date",
      originalDates.start || originalDates.end ? originalDates : undefined
    );
    setIsCalendarOpen(false);
  };

  const handleSubmit = async (data: TripPayload) => {
    mutate(data);
    setOpen(false);
    form.reset();
  };

  const handleClose = () => {
    setOpen(!open);
    setTempDates({});
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-11/12 rounded-lg">
        <DialogHeader className="flex items-start">
          <DialogTitle>Create new trip</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col space-y-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Name</Label>
                  <FormControl className="h-12 text-sm">
                    <div className="flex has-[:disabled]:border-gray-300 has-[:disabled]:text-gray-300 items-center pl-3 h-11 space-x-0 rounded-md border shadow-sm has-[:focus]:border-black">
                      <FormInput className="text-gray-400" />
                      <Input
                        {...field}
                        placeholder="Choose your trip name"
                        className="border-0 shadow-none focus-visible:ring-0 text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destinationId"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Label>Destination (optional)</Label>
                  <FormControl>
                    <DestinationInput
                      disabled={form.watch("anywhere")}
                      options={dests ?? []}
                      field={field}
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
                onOpenChange={handleCalendarOpen}
                onCancel={handleDateCancel}
              />
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="ghost"
                className="flex-1 h-12 border border-gray-300"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="ghost"
                className="flex-1 h-12 disabled:bg-gray-200 bg-primary-500"
                disabled={!form.formState.isValid}
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
