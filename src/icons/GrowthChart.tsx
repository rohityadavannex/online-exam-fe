import { IconType } from "./icons.types";

export const GrowthChart = ({ className, color = "#00B69B" }: IconType) => {
  return (
    <svg
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.3334 0L22.3867 3.05333L15.8801 9.56L10.5467 4.22667L0.666748 14.12L2.54675 16L10.5467 8L15.8801 13.3333L24.2801 4.94667L27.3334 8V0H19.3334Z"
        fill={color}
      />
    </svg>
  );
};