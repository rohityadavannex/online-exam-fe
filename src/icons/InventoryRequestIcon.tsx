import { IconType } from "./icons.types";

const InventoryRequestIcon = ({ color = "#28303F", className }: IconType) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse
      cx="10.0001"
      cy="14.1668"
      rx="0.833333"
      ry="0.833333"
      fill={color}
    />
    <path
      d="M7.50008 7.5C7.50008 6.11929 8.61937 5 10.0001 5C11.3808 5 12.5001 6.11929 12.5001 7.5C12.5001 8.59415 11.7972 9.52412 10.8183 9.86302C10.3834 10.0136 10.0001 10.3731 10.0001 10.8333V11.6667M9.16675 2.5H10.8334C14.9756 2.5 18.3334 5.85786 18.3334 10C18.3334 14.1421 14.9756 17.5 10.8334 17.5H5.00008C3.15913 17.5 1.66675 16.0076 1.66675 14.1667V10C1.66675 5.85786 5.02461 2.5 9.16675 2.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default InventoryRequestIcon;
