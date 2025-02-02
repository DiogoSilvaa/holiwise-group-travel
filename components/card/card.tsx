import { FC, ReactNode, useMemo } from "react";
import { UserIcon } from "../user-icon/user-icon";
import Image from "next/image";
import { ImageGallery } from "../image-gallery/image-gallery";

interface CardProps {
  name: string;
  imageUrls: string[];
  ownerSrc?: string | null;
  onClick?: () => void;
  menu?: ReactNode;
  draggingDestinationId?: string | null;
  destinationIds?: string[];
}

const DropOverlay = () => (
  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
    <span className="text-white font-semibold">Drop here</span>
  </div>
);

const EmptyState = ({ hideText }: { hideText: boolean }) => (
  <div className="relative w-full h-full bg-gray-200">
    <Image
      src="/images/placeholder.webp"
      alt="Placholder image"
      fill
      className="object-cover rounded-xl"
      priority
      sizes="33vw"
    />
    {!hideText && (
      <>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-2">
          <p className="text-white text-base font-semibold z-10">No destination selected</p>
        </div>
      </>
    )}
  </div>
);

export const Card: FC<CardProps> = ({
  name,
  imageUrls,
  ownerSrc,
  onClick,
  menu,
  draggingDestinationId,
  destinationIds,
}) => {
  const count = imageUrls.length;

  const { canAcceptDrop } = useMemo(
    () => ({
      canAcceptDrop:
        destinationIds && draggingDestinationId
          ? !destinationIds.includes(draggingDestinationId)
          : false,
    }),
    [destinationIds, draggingDestinationId]
  );

  return (
    <div
      className="relative flex flex-col space-y-2 cursor-pointer"
      aria-label={`View ${name}`}
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl">
        {count > 0 ? <ImageGallery urls={imageUrls} /> : <EmptyState hideText={canAcceptDrop} />}
        {menu && <div className="absolute top-2 right-2">{menu}</div>}
        {canAcceptDrop && <DropOverlay />}
      </div>
      <h4 className="truncate font-semibold">{name}</h4>
      {ownerSrc && <UserIcon size="small" img_src={ownerSrc} />}
    </div>
  );
};
