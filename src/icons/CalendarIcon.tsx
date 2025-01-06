import { IconType } from "./icons.types";

export const CalendarIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.3333 1.66663V4.16663"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.66675 1.66663V4.16663"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 6.91663C2.5 4.70749 4.29086 2.91663 6.5 2.91663H13.5C15.7091 2.91663 17.5 4.70749 17.5 6.91663V14.3333C17.5 16.5424 15.7091 18.3333 13.5 18.3333H6.5C4.29086 18.3333 2.5 16.5424 2.5 14.3333V6.91663Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M2.5 7.5H17.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
