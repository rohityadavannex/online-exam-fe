import { IconType } from "./icons.types";

const VendorIcon = ({ className, color = "#000000" }: IconType) => {
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
        d="M5.83334 15.3332C5.83334 14.4127 6.57954 13.6665 7.50001 13.6665C8.42048 13.6665 9.16668 14.4127 9.16668 15.3332V18.6665H5.83334V15.3332Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18.3334 7.20833V5.33333C18.3334 3.49238 16.841 2 15 2H5.00002C3.15907 2 1.66669 3.49238 1.66669 5.33333V7.20833C1.66669 8.93422 2.91034 10.3333 4.44447 10.3333C5.97859 10.3333 7.22224 8.93422 7.22224 7.20833C7.22224 8.93422 8.4659 10.3333 10 10.3333C11.5341 10.3333 12.7778 8.93422 12.7778 7.20833C12.7778 8.93422 14.0215 10.3333 15.5556 10.3333C17.0897 10.3333 18.3334 8.93422 18.3334 7.20833Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 12.8333C11.6667 12.3731 12.0398 12 12.5 12H14.1667C14.6269 12 15 12.3731 15 12.8333V13.6667C15 14.1269 14.6269 14.5 14.1667 14.5H12.5C12.0398 14.5 11.6667 14.1269 11.6667 13.6667V12.8333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 9.5V15.3333C17.5 17.1743 16.0076 18.6667 14.1667 18.6667H5.83333C3.99238 18.6667 2.5 17.1743 2.5 15.3333V9.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VendorIcon;
