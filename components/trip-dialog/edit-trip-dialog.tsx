"use client";

import { FC, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Form } from "../form";
import { Button } from "../button";
import { TripFormFields } from "./trip-form-fields";
import { useDatepicker } from "./date-picker-hook";
import { CompleteTrip, TripPayload } from "@/app/api/trips/types";
import { tripSchema } from "./validation";
import { Archive, Trash } from "lucide-react";
import { useDeleteTrip, useUpdateTrip } from "@/hooks/trip";
import { useRouter } from "next/navigation";

interface EditTripDialogProps {
  children: ReactNode;
  trip: CompleteTrip;
}

export const EditTripDialog: FC<EditTripDialogProps> = ({ children, trip }) => {
  const defaults = {
    name: trip.name,
    date: {
      start: trip.start ? new Date(trip.start) : undefined,
      end: trip.end ? new Date(trip.end) : undefined,
    },
  };
  const { isCalendarOpen, tempDates, setTempDates, handleCalendarOpenChange, handleCancelDates } =
    useDatepicker({ start: defaults.date.start, end: defaults.date.end });
  const { mutate } = useUpdateTrip();
  const router = useRouter();
  const { mutate: deleteTrip } = useDeleteTrip();
  const form = useForm<TripPayload>({
    resolver: zodResolver(tripSchema),
    defaultValues: defaults,
  });

  const onCalendarOpenChange = (open: boolean) =>
    handleCalendarOpenChange(
      open,
      () => form.getValues("date"),
      (d) => form.setValue("date", d)
    );

  const onCancelDate = () => handleCancelDates((d) => form.setValue("date", d));

  const onSubmit = (data: TripPayload) => {
    mutate({ ...data, id: trip.id });
    setOpen(false);
    form.reset(data);
  };

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
    setTempDates(defaults.date);
    form.reset(defaults);
  };

  const handleArchiveTrip = () => {
    mutate({ status: "archived", id: trip.id });
    setOpen(false);
  };

  const handleDeleteTrip = () => {
    deleteTrip(trip.id);
    setOpen(false);
    router.push("/");
  };

  const onDialogOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    } else {
      setOpen(open);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onDialogOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-11/12 rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit your trip</DialogTitle>
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
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={handleArchiveTrip}
                disabled={trip.status === "archived"}
              >
                <Archive />
                Archive Trip
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 text-red-600"
                onClick={handleDeleteTrip}
              >
                <Trash />
                Delete Trip
              </Button>
            </div>
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
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
