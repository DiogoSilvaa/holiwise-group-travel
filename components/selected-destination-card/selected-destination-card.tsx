import { Destination } from "@/app/api/destinations/types";
import { Button } from "@/components/button";
import { ArrowBigUpIcon, Pin } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { TripDestinationMenu } from "./menu";

export type SelectedDestinationCardProps =
  | {
      destination: Destination;
      isSelected: true;
      onDeselect: (id: string) => void;
      onRemove?: never;
      onSelect?: never;
    }
  | {
      destination: Destination;
      isSelected?: false;
      onSelect: (id: string) => void;
      onRemove: (id: string) => void;
      onDeselect?: never;
    };

export const SelectedDestinationCard: FC<SelectedDestinationCardProps> = (
  props
) => {
  const { image_url, name } = props.destination;
  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="relative">
        <Image
          src={image_url}
          alt={name}
          width={512}
          height={360}
          className="rounded-xl"
        />
        <div className="absolute top-2 right-2 ">
          <TripDestinationMenu {...props} />
        </div>
        {props.isSelected && (
          <div className="absolute top-2 left-2 ">
            <div className="flex justify-center items-center bg-black text-white rounded-lg w-28 text-sm h-7 space-x-1">
              <Pin className="w-4" />
              <span>Selected</span>
            </div>
          </div>
        )}
        <div className="mt-3 space-y-2">
          <h4 className="text-base font-semibold">{name}</h4>
          <Button variant="outline">
            <div className="flex text-center items-center space-x-1">
              <ArrowBigUpIcon />
              <span className="relative bottom-[0.5px]">1</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
