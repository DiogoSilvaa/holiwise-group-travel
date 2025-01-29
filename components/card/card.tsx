import { FC } from "react";
import { UserIcon } from "../user-icon/user-icon";
import Image from "next/image";

interface CardProps {
  name: string;
  image_src: string;
  owner_email?: string;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({
  name,
  image_src,
  owner_email,
  onClick,
}) => {
  return (
    <div className="flex flex-col col-span-1 row-span-1 space-y-2">
      <Image
        src={image_src}
        alt={name}
        width={512}
        height={360}
        className="rounded-xl"
      />
      <h4 className="truncate font-semibold">{name}</h4>
      {owner_email && <UserIcon size="small" email={owner_email} />}
    </div>
  );
};
