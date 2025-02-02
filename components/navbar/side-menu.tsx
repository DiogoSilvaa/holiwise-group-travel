import classNames from "classnames";
import { FC } from "react";
import { Button } from "../button";
import { Logo } from "../icons/logo";
import { MenuItem } from "./menu-item";
import { UserItem } from "./user-item";
import { Bed, Earth, Luggage, X } from "lucide-react";

interface SideMenuProps {
  isSideOpen: boolean;
  closeSide: () => void;
}

export const SideMenu: FC<SideMenuProps> = ({ isSideOpen, closeSide }) => {
  return (
    <>
      <div
        className={classNames(
          "fixed flex flex-col top-0 left-0 z-50 w-3/4 h-full bg-white transform transition-transform duration-300 border-r rounded-r-2xl",
          isSideOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="border-b flex items-center py-3 pl-5 space-x-5">
          <Button
            onClick={closeSide}
            variant="outline"
            className="flex justify-center items-center text-center rounded-xl h-12 w-12"
          >
            <X size={24} />
          </Button>
          <Logo />
        </div>
        <ul className="flex-1 flex flex-col gap-2 px-4 py-3">
          <li>
            <MenuItem
              icon={<Earth size={20} strokeWidth="1" />}
              text="Destinations"
              isActive={false}
              isDisabled
            />
          </li>
          <li>
            <MenuItem
              icon={<Bed size={20} strokeWidth="1" />}
              text="Hotels"
              isActive={false}
              isDisabled
            />
          </li>
          <li>
            <MenuItem
              icon={<Luggage size={20} strokeWidth="1" />}
              text="My trips"
              isActive
              isDisabled={false}
            />
          </li>
        </ul>
        <div className="px-4 pb-8">
          <UserItem />
        </div>
      </div>
      <div
        className={classNames(
          "bg-black z-40 fixed inset-0 transition-opacity duration-300",
          isSideOpen ? "opacity-65" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSide}
      />
    </>
  );
};
