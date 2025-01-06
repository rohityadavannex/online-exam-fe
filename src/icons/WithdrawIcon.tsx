import { IconType } from "./icons.types";

export const WithdrawIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0001 9.16667L15.0001 5.83333L5.00008 5.83333V15.8333C5.00008 16.7538 5.74627 17.5 6.66675 17.5H13.3334C14.2539 17.5 15.0001 16.7538 15.0001 15.8333V9.16667ZM15.0001 9.16667C16.841 9.16667 18.3334 7.67428 18.3334 5.83333C18.3334 3.99239 16.841 2.5 15.0001 2.5H5.00008C3.15913 2.5 1.66675 3.99238 1.66675 5.83333C1.66675 7.67428 3.15913 9.16667 5.00008 9.16667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.6666 12.4993L10.5892 13.5768C10.2637 13.9022 9.7361 13.9022 9.41066 13.5768L8.33325 12.4993M9.99992 9.16602V13.3327"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
