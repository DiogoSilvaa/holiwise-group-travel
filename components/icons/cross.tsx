import * as React from "react";
import { SVGProps } from "react";
export const Cross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.3}
    className="lucide lucide-x h-6 w-6"
    {...props}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
