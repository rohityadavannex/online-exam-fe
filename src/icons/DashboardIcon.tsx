import { IconType } from "./icons.types";

export const DashboardIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.13135 3.33329C2.13135 2.41282 2.87754 1.66663 3.79801 1.66663H7.13135C8.05182 1.66663 8.79801 2.41282 8.79801 3.33329V6.66663C8.79801 7.5871 8.05182 8.33329 7.13135 8.33329H3.79801C2.87754 8.33329 2.13135 7.5871 2.13135 6.66663V3.33329Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.1313 3.33329C12.1313 2.41282 12.8775 1.66663 13.798 1.66663H17.1313C18.0518 1.66663 18.798 2.41282 18.798 3.33329V6.66663C18.798 7.5871 18.0518 8.33329 17.1313 8.33329H13.798C12.8775 8.33329 12.1313 7.5871 12.1313 6.66663V3.33329Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M2.13135 13.3333C2.13135 12.4128 2.87754 11.6666 3.79801 11.6666H7.13135C8.05182 11.6666 8.79801 12.4128 8.79801 13.3333V16.6666C8.79801 17.5871 8.05182 18.3333 7.13135 18.3333H3.79801C2.87754 18.3333 2.13135 17.5871 2.13135 16.6666V13.3333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12.1313 13.3333C12.1313 12.4128 12.8775 11.6666 13.798 11.6666H17.1313C18.0518 11.6666 18.798 12.4128 18.798 13.3333V16.6666C18.798 17.5871 18.0518 18.3333 17.1313 18.3333H13.798C12.8775 18.3333 12.1313 17.5871 12.1313 16.6666V13.3333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
