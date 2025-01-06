import { IconType } from "./icons.types";

export const CommentIcon = ({ className, color = "#ffffff" }: IconType) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3304 9.16669H13.3379M9.99626 9.16669H10.0037M6.66211 9.16669H6.6696M7.08335 15.8334H6.66669C3.33335 15.8334 1.66669 15 1.66669 10.8334V6.66669C1.66669 3.33335 3.33335 1.66669 6.66669 1.66669H13.3334C16.6667 1.66669 18.3334 3.33335 18.3334 6.66669V10.8334C18.3334 14.1667 16.6667 15.8334 13.3334 15.8334H12.9167C12.6584 15.8334 12.4084 15.9584 12.25 16.1667L11 17.8334C10.45 18.5667 9.55002 18.5667 9.00002 17.8334L7.75002 16.1667C7.61669 15.9834 7.30835 15.8334 7.08335 15.8334Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
      />
    </svg>
  );
};
