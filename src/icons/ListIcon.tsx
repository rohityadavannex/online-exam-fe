import { IconType } from "./icons.types";

export const ListIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M7 1H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M1 1H3" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 8H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M1 8H3" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 15H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M1 15H3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
