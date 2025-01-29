import * as React from "react";
import { SVGProps } from "react";
export const Hamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-menu h-6 w-6"
    {...props}
  >
    <path d="M4 12h16M4 6h16M4 18h16" />
  </svg>
);
