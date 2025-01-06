import { IconType } from "./icons.types";

const ProcurementIcon = ({ className, color = "#000000" }: IconType) => {
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
        d="M5.00008 3.66667H15.0001C16.841 3.66667 18.3334 5.15905 18.3334 7V11.1667C18.3334 13.0076 16.841 14.5 15.0001 14.5H8.33342C6.49247 14.5 5.00008 13.0076 5.00008 11.1667V3.66667ZM5.00008 3.66667C5.00008 2.74619 4.25389 2 3.33341 2H1.66675"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.00008 4.5L4.69947 2.69633C4.6325 2.29451 4.28484 2 3.87748 2H1.66675"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.16675 17.4165C9.16675 18.1069 8.6071 18.6665 7.91675 18.6665C7.22639 18.6665 6.66675 18.1069 6.66675 17.4165C6.66675 16.7261 7.22639 16.1665 7.91675 16.1665C8.6071 16.1665 9.16675 16.7261 9.16675 17.4165Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M16.6667 17.4165C16.6667 18.1069 16.1071 18.6665 15.4167 18.6665C14.7264 18.6665 14.1667 18.1069 14.1667 17.4165C14.1667 16.7261 14.7264 16.1665 15.4167 16.1665C16.1071 16.1665 16.6667 16.7261 16.6667 17.4165Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M13.3333 10.3333L12.2559 11.4107C11.9305 11.7362 11.4028 11.7362 11.0774 11.4107L10 10.3333M11.6667 7V11.1667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ProcurementIcon;
