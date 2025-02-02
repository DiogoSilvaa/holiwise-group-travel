import { FC, ReactNode } from "react";
import { UserIcon } from "../user-icon/user-icon";
import Image from "next/image";

interface CardProps {
  name: string;
  image_urls: string[];
  owner_src?: string | null;
  onClick?: () => void;
  menu?: ReactNode;
}

export const Card: FC<CardProps> = ({ name, image_urls, owner_src, onClick, menu }) => {
  const count = image_urls.length;

  return (
    <div className="relative flex flex-col space-y-2 cursor-pointer" onClick={onClick}>
      <div className="relative aspect-video overflow-hidden rounded-xl">
        {count > 0 ? (
          image_urls.map((url, index) => {
            const offsetPercent = 100 / count;
            return (
              <div
                key={url + index}
                style={{
                  left: `${index * offsetPercent}%`,
                  zIndex: index,
                }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <Image
                  src={url}
                  alt={name}
                  priority
                  quality={50}
                  width={200}
                  height={200}
                  className="object-cover rounded-xl"
                />
              </div>
            );
          })
        ) : (
          <div className="relative w-full h-full bg-gray-200">
            <Image
              src="/images/placeholder.webp"
              alt={name}
              width={200}
              height={200}
              priority
              className="object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
            <div className="absolute inset-0 flex text-center items-center justify-center p-4 text-white text-sm font-semibold z-10">
              No destination selected
            </div>
          </div>
        )}
        {menu && <div className="absolute top-2 right-2">{menu}</div>}
      </div>
      <h4 className="truncate font-semibold">{name}</h4>
      {owner_src && <UserIcon size="small" img_src={owner_src} />}
    </div>
  );
};
