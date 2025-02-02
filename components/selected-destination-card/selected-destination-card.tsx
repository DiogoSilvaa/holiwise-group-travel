import { Destination } from "@/app/api/destinations/types";
import { Button } from "@/components/button";
import { ArrowBigUpIcon, Pin } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { TripDestinationMenu } from "./menu";
import { useFetchTripVotes, useToggleTripVote } from "@/hooks/trip-votes";
import classNames from "classnames";

export type SelectedDestinationCardProps =
  | {
      tripId: string;
      destination: Destination;
      isSelected: true;
      onDeselect: (id: string) => void;
      onRemove: (id: string) => void;
      onSelect?: never;
    }
  | {
      tripId: string;
      destination: Destination;
      isSelected?: false;
      onSelect: (id: string) => void;
      onRemove: (id: string) => void;
      onDeselect?: never;
    };

export const SelectedDestinationCard: FC<SelectedDestinationCardProps> = (props) => {
  const { image_url, name } = props.destination;
  const { data: voteResult } = useFetchTripVotes({
    tripId: props.tripId,
    destinationId: props.destination.id,
  });
  const { mutate } = useToggleTripVote();
  const toggleVote = () =>
    mutate({
      tripId: props.tripId,
      destinationId: props.destination.id,
    });

  return (
    <div className="w-full lg:max-w-sm p-3 border border-gray-200 rounded-lg">
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <Image
          src={image_url}
          alt={name}
          fill
          priority
          className="object-cover rounded-xl"
          sizes="33vw"
        />
        <div className="absolute top-2 right-2">
          <TripDestinationMenu {...props} />
        </div>
        {props.isSelected && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center bg-black text-white rounded-lg w-28 h-7 text-sm space-x-1 justify-center">
              <Pin className="w-4" />
              <span>Selected</span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-1 space-y-2 flex justify-between">
        <h4 className="text-base font-semibold truncate">{name}</h4>
        <Button variant="outline" className="w-14 hover:bg-white" onClick={toggleVote}>
          <div className="flex items-center justify-center space-x-1">
            <ArrowBigUpIcon className={classNames(voteResult?.hasVoted ? "fill-black" : "")} />
            <span className="relative bottom-[0.5px]">{voteResult?.totalVotes}</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
