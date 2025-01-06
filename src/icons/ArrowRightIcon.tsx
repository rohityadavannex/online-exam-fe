import { IconType } from "./icons.types";

export const ArrowRightIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="11"
      viewBox="0 0 15 11"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0303 6.06506C14.3232 5.77217 14.3232 5.29729 14.0303 5.0044L10.0303 1.0044C9.73744 0.711506 9.26256 0.711506 8.96967 1.0044C8.67678 1.29729 8.67678 1.77217 8.96967 2.06506L11.6893 4.78473L1.5 4.78473C1.08579 4.78473 0.75 5.12052 0.75 5.53473C0.75 5.94894 1.08579 6.28473 1.5 6.28473L11.6893 6.28473L8.96967 9.0044C8.67678 9.29729 8.67678 9.77217 8.96967 10.0651C9.26256 10.358 9.73744 10.358 10.0303 10.0651L14.0303 6.06506Z"
        fill={color}
      />
    </svg>
  );
};
