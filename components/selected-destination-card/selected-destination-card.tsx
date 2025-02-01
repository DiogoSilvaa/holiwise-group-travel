import { Destination } from "@/app/api/destinations/types";
import { Button } from "@/components/button";
import { ArrowBigUpIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { TripDestinationMenu } from "./menu";

interface SelectedDestinationCardProps {
  destination: Destination;
}

export const SelectedDestinationCard: FC<SelectedDestinationCardProps> = ({
  destination,
}) => {
  const { image_url, name } = destination;
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
          <TripDestinationMenu />
        </div>
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
