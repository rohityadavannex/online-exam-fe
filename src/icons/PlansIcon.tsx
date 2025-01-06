import { IconType } from "./icons.types";

export const PlansIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.79785 5.6665C3.79785 3.45737 5.58871 1.6665 7.79785 1.6665H12.9743C14.0352 1.6665 15.0526 2.08793 15.8028 2.83808L17.6263 4.6616C18.3764 5.41174 18.7979 6.42916 18.7979 7.49003V14.3332C18.7979 16.5423 17.007 18.3332 14.7979 18.3332H7.79785C5.58871 18.3332 3.79785 16.5423 3.79785 14.3332V5.6665Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.96454 5.8335L14.6312 5.8335"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.96454 10H14.6312"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.96454 14.1665H11.2979"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
