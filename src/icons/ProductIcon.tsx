import { IconType } from "./icons.types";

const ProductIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.3334 15.3333V6.13439C18.3334 5.62808 18.1032 5.14922 17.7078 4.83294L15.0797 2.73045C14.4887 2.25761 13.7543 2.00001 12.9974 2.00001L7.00263 2C6.24572 2 5.51135 2.2576 4.9203 2.73044L2.29219 4.83294C1.89684 5.14922 1.66669 5.62808 1.66669 6.13438V15.3333C1.66669 17.1743 3.15907 18.6667 5.00002 18.6667H15C16.841 18.6667 18.3334 17.1743 18.3334 15.3333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 5.33301H12.5V7.83301C12.5 9.21372 11.3807 10.333 10 10.333C8.61929 10.333 7.5 9.21372 7.5 7.83301V5.33301Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M2.08331 5.33301H17.9166"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProductIcon;
