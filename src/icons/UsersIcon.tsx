import { IconType } from "./icons.types";

export const UsersIcon = ({ className, color = "#3D42DF" }: IconType) => {
  return (
    <svg
      width="42"
      height="32"
      viewBox="0 0 42 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        opacity="0.587821"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.55566 7.11111C9.55566 11.0385 12.7394 14.2222 16.6668 14.2222C20.5941 14.2222 23.7779 11.0385 23.7779 7.11111C23.7779 3.18375 20.5941 0 16.6668 0C12.7394 0 9.55566 3.18375 9.55566 7.11111ZM27.3334 14.2222C27.3334 17.1677 29.7212 19.5555 32.6668 19.5555C35.6123 19.5555 38.0001 17.1677 38.0001 14.2222C38.0001 11.2767 35.6123 8.88887 32.6668 8.88887C29.7212 8.88887 27.3334 11.2767 27.3334 14.2222Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6371 17.7778C8.24348 17.7778 1.35699 22.0916 0.667907 30.5764C0.630372 31.0386 1.51424 32.0001 1.96009 32.0001H31.3275C32.663 32.0001 32.6838 30.9253 32.663 30.5778C32.1421 21.8546 25.1489 17.7778 16.6371 17.7778ZM41.2753 31.0012L36.1341 31.0012C36.1341 27.9999 35.1425 25.2303 33.469 23.002C38.011 23.0517 41.7196 25.348 41.9987 30.2012C42.01 30.3967 41.9987 31.0012 41.2753 31.0012Z"
        fill={color}
      />
    </svg>
  );
};