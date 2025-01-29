import * as React from "react";
import { SVGProps } from "react";
export const Booking = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={0.8}
    className="lucide lucide-briefcase h-5 w-5"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width={20} height={14} x={2} y={6} rx={2} />
  </svg>
);
