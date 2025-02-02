import { FC } from "react";
import { SideMenu } from "./side-menu";

export const DesktopMenu: FC = () => {
  return (
    <aside className="hidden xl:block">
      <div className="hidden xl:block w-64" />
      <SideMenu isSideOpen={true} />
    </aside>
  );
};
