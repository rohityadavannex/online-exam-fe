import { IconType } from "./icons.types";

export const LogoutIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.8334 11.793L16.7096 10.9168C17.1001 10.5263 17.1001 9.89311 16.7096 9.50259L15.8334 8.62636"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.625 10.2097H10.2917M4.75004 16.5431C3.00114 16.5431 1.58337 15.1253 1.58337 13.3764V7.04307C1.58337 5.29417 3.00114 3.8764 4.75004 3.8764M4.75004 16.5431C6.49894 16.5431 7.91671 15.1253 7.91671 13.3764V7.04307C7.91671 5.29417 6.49894 3.8764 4.75004 3.8764M4.75004 16.5431H11.0834C12.8323 16.5431 14.25 15.1253 14.25 13.3764M4.75004 3.8764H11.0834C12.8323 3.8764 14.25 5.29417 14.25 7.04307"
        stroke={color}
        strokeLinecap="round"
      />
    </svg>
  );
};
