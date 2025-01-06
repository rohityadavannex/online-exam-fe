import { IconType } from "./icons.types";

export const ProfileIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.6925 16.1858C13.906 14.0824 11.8779 12.5847 9.50004 12.5847C7.12217 12.5847 5.0941 14.0823 4.30763 16.1858M14.6925 16.1858C16.3615 14.7344 17.4167 12.5953 17.4167 10.2097C17.4167 5.83744 13.8723 2.29303 9.50004 2.29303C5.12779 2.29303 1.58337 5.83744 1.58337 10.2097C1.58337 12.5953 2.63854 14.7344 4.30763 16.1858M14.6925 16.1858C13.3025 17.3946 11.4867 18.1264 9.50004 18.1264C7.51337 18.1264 5.69762 17.3946 4.30763 16.1858"
        stroke={color}
        strokeLinejoin="round"
      />
      <circle
        cx="2.375"
        cy="2.375"
        r="2.375"
        transform="matrix(1 0 0 -1 7.125 10.2097)"
        stroke={color}
        strokeLinejoin="round"
      />
    </svg>
  );
};
