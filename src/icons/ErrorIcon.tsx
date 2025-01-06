import { IconType } from "./icons.types";

const ErrorIcon = ({ className }: IconType) => {
  return (
    <svg
      className={className}
      width="106"
      height="107"
      viewBox="0 0 106 107"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="52.9998" cy="75.5182" r="4.41284" fill="#FC544B" />
      <path
        d="M52.9997 40.2154V62.2797M19.1442 93.1697H86.8558C94.6773 93.1697 99.6212 84.9762 95.8228 78.309L61.967 18.8835C58.0587 12.0235 47.9413 12.0235 44.033 18.8836L10.1772 78.3091C6.37879 84.9763 11.3227 93.1697 19.1442 93.1697Z"
        stroke="#FC544B"
        strokeWidth="6.61926"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ErrorIcon;
