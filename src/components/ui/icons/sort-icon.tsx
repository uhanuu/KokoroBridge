import React from "react";

interface SortIconProps {
  className?: string;
  size?: number;
}

export default function SortIcon({ className, size = 16 }: SortIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h18"/>
      <path d="M7 12h10"/>
      <path d="M10 18h4"/>
    </svg>
  );
}