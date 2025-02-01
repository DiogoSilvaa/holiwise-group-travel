import { FC, ReactNode } from "react";
import { UserIcon } from "../user-icon/user-icon";
import Image from "next/image";

interface CardProps {
  name: string;
  image_src: string;
  owner_email?: string;
  onClick?: () => void;
  menu?: ReactNode;
}

export const Card: FC<CardProps> = ({
  name,
  image_src,
  owner_email,
  onClick,
  menu,
}) => {
  return (
    <div
      className="relative flex flex-col col-span-1 row-span-1 space-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={image_src}
          alt={name}
          width={512}
          height={360}
          className="rounded-xl"
        />
        {menu && <div className="absolute top-2 right-2 ">{menu}</div>}
      </div>
      <h4 className="truncate font-semibold">{name}</h4>
      {owner_email && <UserIcon size="small" email={owner_email} />}
    </div>
  );
};
