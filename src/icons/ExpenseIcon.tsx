import { IconType } from "./icons.types";

export const ExpenseIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.5 12.084H10.8333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 10.3186V9.90385C11.6667 9.26659 11.1502 8.75 10.5129 8.75V8.75C9.87565 8.75 9.35906 9.26659 9.35906 9.90385V10.379C9.35906 11.6053 8.92001 12.791 8.12141 13.7216V13.7216C7.55006 14.3874 8.0231 15.4167 8.90042 15.4167H11.6667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5158 9.78683C5.30267 7.42623 7.51179 5.83398 10.0001 5.83398V5.83398C12.4884 5.83398 14.6975 7.42623 15.4844 9.78683L15.701 10.4366C16.996 14.3218 14.0954 18.334 10.0001 18.334V18.334C5.90474 18.334 3.00414 14.3218 4.2992 10.4366L4.5158 9.78683Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.7383 5.83268L8.26184 5.83268L7.09427 4.49348C5.94974 3.1807 7.28496 1.2185 8.95597 1.75756L9.72911 2.00697C9.90514 2.06375 10.095 2.06375 10.271 2.00697L11.0442 1.75756C12.7152 1.2185 14.0504 3.18071 12.9059 4.49348L11.7383 5.83268Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
