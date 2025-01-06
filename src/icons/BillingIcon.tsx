import { IconType } from "./icons.types";

export const BillingIcon = ({ className, color = "#000000" }: IconType) => {
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
        d="M14.1667 5.83301L5.83341 5.83301"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1667 9.16699L5.83341 9.16699"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5L5.83333 12.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 1.66699H4.5C3.39543 1.66699 2.5 2.56242 2.5 3.66699V15.488C2.5 16.8732 3.87412 17.839 5.17744 17.3698L5.90587 17.1075C6.39388 16.9319 6.93105 16.9526 7.40404 17.1655L9.17927 17.9643C9.70122 18.1992 10.2988 18.1992 10.8207 17.9643L12.596 17.1655C13.0689 16.9526 13.6061 16.9319 14.0941 17.1075L14.8226 17.3698C16.1259 17.839 17.5 16.8732 17.5 15.488V3.66699C17.5 2.56242 16.6046 1.66699 15.5 1.66699Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
