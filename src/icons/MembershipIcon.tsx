import { IconType } from "./icons.types";

export const MembershipIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="18.3333"
        y="2.5"
        width="15"
        height="16.6667"
        rx="4"
        transform="rotate(90 18.3333 2.5)"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="5.00008" cy="14.1663" r="0.833333" fill={color} />
      <path
        d="M1.66658 5.83301L18.3333 5.83301L18.3333 9.16634L1.66658 9.16634L1.66658 5.83301Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
