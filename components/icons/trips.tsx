import * as React from "react";
import { SVGProps } from "react";
export const Trips = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.3}
    className="lucide lucide-luggage h-5 w-5"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
    <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14M10 20h4" />
    <circle cx={16} cy={20} r={2} />
    <circle cx={8} cy={20} r={2} />
  </svg>
);
