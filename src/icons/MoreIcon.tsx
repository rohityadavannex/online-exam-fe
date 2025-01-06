import { IconType } from "./icons.types";

export const MoreIcon = ({ className, color = "#FFFFFF" }: IconType) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="26" height="26" rx="13" fill="white" />
      <rect
        x="1"
        y="1"
        width="24"
        height="24"
        rx="12"
        stroke="#1C1D22"
        strokeOpacity="0.1"
        strokeWidth="2"
      />
      <circle cx="17" cy="13" r="1" fill="#1C1D22" />
      <circle cx="13" cy="13" r="1" fill="#1C1D22" />
      <circle cx="9" cy="13" r="1" fill="#1C1D22" />
    </svg>
  );
};
