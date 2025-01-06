import { IconType } from "./icons.types";

export const StaffIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="8.33333"
        cy="14.5832"
        rx="5.83333"
        ry="2.91667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="8.33333"
        cy="5.83333"
        r="3.33333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6175 8.41292C12.3097 8.92294 11.9135 9.37354 11.45 9.74346C11.7794 9.85583 12.1326 9.9168 12.5 9.9168C14.2949 9.9168 15.75 8.46173 15.75 6.6668C15.75 4.94427 14.4099 3.53473 12.7154 3.42383C12.9969 3.93459 13.1916 4.49985 13.2799 5.09975C13.8549 5.38651 14.25 5.98052 14.25 6.6668C14.25 7.59382 13.5292 8.35249 12.6175 8.41292Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3242 16.2468C15.653 15.7312 15.8333 15.1702 15.8333 14.5835C15.8333 14.5538 15.8329 14.5242 15.832 14.4946C16.1844 14.3392 16.4303 14.175 16.5808 14.0268C16.7404 13.8696 16.75 13.7765 16.75 13.7501C16.75 13.7238 16.7404 13.6307 16.5808 13.4735C16.4185 13.3137 16.1453 13.1352 15.7471 12.9693C15.5898 12.9038 15.4185 12.8425 15.2349 12.7864C14.7162 12.0435 13.8858 11.4014 12.844 10.9214C14.1673 10.9567 15.388 11.1947 16.324 11.5847C16.8307 11.7958 17.2896 12.0663 17.6334 12.4049C17.9798 12.7462 18.25 13.2012 18.25 13.7501C18.25 14.2991 17.9798 14.7541 17.6334 15.0954C17.2896 15.434 16.8307 15.7045 16.324 15.9156C16.0189 16.0427 15.6835 16.1537 15.3242 16.2468Z"
        fill={color}
      />
    </svg>
  );
};
