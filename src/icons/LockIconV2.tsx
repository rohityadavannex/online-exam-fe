import { IconType } from "./icons.types";

export const LockIconV2 = ({ className, color = "#FFFFFF" }: IconType) => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M27.167 13.8333L13.8337 13.8333M27.167 13.8333C30.8489 13.8333 33.8337 16.8181 33.8337 20.5V30.5C33.8337 34.1819 30.8489 37.1667 27.167 37.1667H13.8337C10.1518 37.1667 7.16699 34.1819 7.16699 30.5L7.16699 20.5C7.16699 16.8181 10.1518 13.8333 13.8337 13.8333M27.167 13.8333V10.5C27.167 6.8181 24.1822 3.83334 20.5003 3.83334C16.8184 3.83334 13.8337 6.8181 13.8337 10.5V13.8333M20.5003 27.1667V23.8333"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
