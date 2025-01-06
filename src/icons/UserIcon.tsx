import { IconType } from "./icons.types";

export const UserIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="10"
        cy="14.5834"
        rx="5.83333"
        ry="2.91667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="10"
        cy="5.83333"
        rx="3.33333"
        ry="3.33333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
