"use client";

import { FC, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Form, FormField } from "../form";
import { Button } from "../button";
import { TripFormFields } from "./trip-form-fields";
import { DestinationInput } from "./destination-input";
import { useDatepicker } from "./date-picker-hook";
import { TripPayload } from "@/app/api/trips/types";
import { tripSchema } from "./validation";
import { Destination } from "@/app/api/destinations/types";
import { useCreateTrip } from "@/hooks/trip";

interface CreateTripDialogProps {
  children: ReactNode;
  destinations: Destination[];
}

export const CreateTripDialog: FC<CreateTripDialogProps> = ({ children, destinations }) => {
  const { isCalendarOpen, tempDates, setTempDates, handleCalendarOpenChange, handleCancelDates } =
    useDatepicker();
  const { mutate } = useCreateTrip();

  const form = useForm<TripPayload>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      name: "",
      date: undefined,
      destinationId: undefined,
    },
  });

  const onCalendarOpenChange = (open: boolean) =>
    handleCalendarOpenChange(
      open,
      () => form.getValues("date"),
      (d) => form.setValue("date", d)
    );

  const onCancelDate = () => handleCancelDates((d) => form.setValue("date", d));

  const onSubmit = (data: TripPayload) => {
    mutate(data);
    setOpen(false);
    form.reset();
  };

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-11/12 rounded-lg">
        <DialogHeader>
          <DialogTitle>Create new trip</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <TripFormFields
              control={form.control}
              tempDates={tempDates}
              setTempDates={setTempDates}
              isCalendarOpen={isCalendarOpen}
              onCalendarOpenChange={onCalendarOpenChange}
              onCancelDate={onCancelDate}
            />
            <FormField
              control={form.control}
              name="destinationId"
              render={({ field }) => (
                <div className="space-y-1">
                  <label className="block text-sm font-medium">Destination (optional)</label>
                  <DestinationInput field={field} options={destinations} />
                </div>
              )}
            />
            <div className="flex gap-4">
              <Button
                type="button"
                variant="ghost"
                className="flex-1 h-12 border border-gray-300"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="flex-1 h-12 bg-primary-500 text-black"
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
