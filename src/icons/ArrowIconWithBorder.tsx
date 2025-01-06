import { IconType } from "./icons.types";

export const ArrowIconWithBorder = ({
  className,
  color = "#000000",
}: IconType) => {
  return (
    <svg
      width="26"
      height="25"
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 24.8C19.7011 24.8 25.1333 19.3677 25.1333 12.6667C25.1333 5.96563 19.7011 0.533354 13 0.533354C6.29894 0.533354 0.866667 5.96563 0.866667 12.6667C0.866667 19.3677 6.29894 24.8 13 24.8Z"
        stroke={color}
        strokeWidth="0.266667"
      />
      <path
        d="M7.61121 11.4444L12.3334 15.2222L17.0557 11.4444"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
