import { IconType } from "./icons.types";

const DataExportIcon = ({ className, color = "#28303F" }: IconType) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_2552_2243)">
        <path
          d="M6.66666 13.3327C6.66666 9.99935 9.99999 8.33268 13.3333 8.33268M13.3333 8.33268L11.6667 10.8327M13.3333 8.33268L10.8333 6.66602M4.99999 18.3327H15C16.8409 18.3327 18.3333 16.8403 18.3333 14.9993V4.99935C18.3333 3.1584 16.8409 1.66602 15 1.66602H4.99999C3.15904 1.66602 1.66666 3.1584 1.66666 4.99935V14.9993C1.66666 16.8403 3.15904 18.3327 4.99999 18.3327Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2552_2243">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DataExportIcon;
