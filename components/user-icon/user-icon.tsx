import { FC } from "react";
import Image from "next/image";

interface UserIconProps {
  size?: "small" | "normal";
  img_src: string;
}

export const UserIcon: FC<UserIconProps> = ({ size = "normal", img_src }) => {
  return (
    <div className="min-w-fit">
      <Image
        className="rounded-lg"
        src={img_src}
        alt="user profile picture"
        width={size === "normal" ? 48 : 28}
        height={size === "normal" ? 48 : 28}
        priority
      />
    </div>
  );
};
