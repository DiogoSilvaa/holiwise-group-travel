import classNames from "classnames";
import { FC } from "react";
import { Button } from "../button/button";
import { Cross } from "../icons/cross";
import { Logo } from "../icons/logo";
import { MenuItem } from "./menu-item";
import { World } from "../icons/world";
import { Hotel } from "../icons/hotels";
import { Trips } from "../icons/trips";
import { UserItem } from "./user-item";

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
          <Button icon={<Cross />} onClick={closeSide} />
          <Logo />
        </div>
        <ul className="flex-1 flex flex-col gap-2 px-6 py-3">
          <li>
            <MenuItem
              icon={<World />}
              text="Destinations"
              isActive={false}
              isDisabled
            />
          </li>
          <li>
            <MenuItem
              icon={<Hotel />}
              text="Hotels"
              isActive={false}
              isDisabled
            />
          </li>
          <li>
            <MenuItem
              icon={<Trips />}
              text="My trips"
              isActive
              isDisabled={false}
            />
          </li>
        </ul>
        <div className="px-6 pb-8">
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
