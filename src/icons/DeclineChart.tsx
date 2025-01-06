import { IconType } from "./icons.types";

export const DeclineChart = ({ className, color = "#F93C65" }: IconType) => {
  return (
    <svg
      width="27"
      height="16"
      viewBox="0 0 27 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.9966 16L22.05 12.9467L15.5433 6.44L10.21 11.7733L0.329956 1.88L2.20996 0L10.21 8L15.5433 2.66667L23.9433 11.0533L26.9966 8V16H18.9966Z"
        fill={color}
      />
    </svg>
  );
};
