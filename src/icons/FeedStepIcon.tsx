import { IconType } from "./icons.types";

export const FeedStepIcon = ({
  className,
  color = "var(--primary-color)",
}: IconType) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="5.5" y="5.5" width="21" height="21" rx="10.5" fill="white" />
      <rect
        x="5.5"
        y="5.5"
        width="21"
        height="21"
        rx="10.5"
        stroke="url(#paint0_linear_563_1273)"
        strokeWidth="11"
      />
      <defs>
        <linearGradient
          id="paint0_linear_563_1273"
          x1="16"
          y1="0"
          x2="16"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
    </svg>
  );
};
// "#0C8CE9"
