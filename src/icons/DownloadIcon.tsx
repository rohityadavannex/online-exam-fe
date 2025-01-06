import { IconType } from "./icons.types";

export const DownloadIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 22C7.86748 22 9.43606 20.7202 9.87657 18.9899C10.0128 18.4547 10.4477 18 11 18H18M6 22C3.79086 22 2 20.2091 2 18V5C2 3.34315 3.34315 2 5 2H15C16.6569 2 18 3.34315 18 5V18M6 22H18C19.8675 22 21.4361 20.7202 21.8766 18.9899C22.0128 18.4547 21.5523 18 21 18H18M7 10L8.58579 11.5858C9.36683 12.3668 10.6332 12.3668 11.4142 11.5858L13 10M10 12V7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
