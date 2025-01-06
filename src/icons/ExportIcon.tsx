import { IconType } from "./icons.types";

export const ExportIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M15 10.5V7.99268C15 7.37951 15 7.07295 14.8858 6.79729C14.7716 6.52164 14.5549 6.30487 14.1213 5.87132L10.5689 2.31891C10.1947 1.94475 10.0077 1.75766 9.77588 1.64681C9.72765 1.62375 9.6783 1.60329 9.6279 1.58551C9.38558 1.5 9.12105 1.5 8.59185 1.5C6.15811 1.5 4.94123 1.5 4.117 2.16455C3.95048 2.29881 3.79881 2.45048 3.66455 2.617C3 3.44123 3 4.65812 3 7.09188V10.5C3 13.3284 3 14.7427 3.87868 15.6213C4.75736 16.5 6.17157 16.5 9 16.5M9.75 1.875V2.25C9.75 4.37132 9.75 5.43198 10.409 6.09099C11.0681 6.75 12.1287 6.75 14.25 6.75H14.625"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 16.5C13.2051 16.0576 15 14.8802 15 14.25C15 13.6198 13.2051 12.4424 12.75 12M14.25 14.25H9"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
