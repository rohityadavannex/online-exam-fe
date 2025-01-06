import { IconType } from "./icons.types";

const InventoryManagementIcon = ({
  color = "#000000",
  className,
}: IconType) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6.66667 10.8332H13.3333M6.66667 7.49984H13.3333M6.66667 14.1665H10M6.66667 1.6665V4.1665M13.3333 1.6665V4.1665M5.83333 18.3332H14.1667C16.0076 18.3332 17.5 16.8408 17.5 14.9998V6.24984C17.5 4.40889 16.0076 2.9165 14.1667 2.9165H5.83333C3.99238 2.9165 2.5 4.40889 2.5 6.24984V14.9998C2.5 16.8408 3.99238 18.3332 5.83333 18.3332Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default InventoryManagementIcon;
