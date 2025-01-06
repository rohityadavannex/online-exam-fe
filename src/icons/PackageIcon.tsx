import { IconType } from "./icons.types";

export const PackageIcon = ({ className, color = "#000000" }: IconType) => {
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
        d="M3.33325 10V15.3333C3.33325 16.9902 4.6764 18.3333 6.33325 18.3333H13.6666C15.3234 18.3333 16.6666 16.9902 16.6666 15.3333V10"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M10 6.66675H16.1667C16.4814 6.66675 16.7778 6.81494 16.9667 7.06675L17.9667 8.40008C18.4611 9.05932 17.9907 10.0001 17.1667 10.0001H13C12.6852 10.0001 12.3889 9.85189 12.2 9.60008L10 6.66675Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M10 6.66675H3.83333C3.51858 6.66675 3.22219 6.81494 3.03333 7.06675L2.03333 8.40008C1.53891 9.05932 2.00929 10.0001 2.83333 10.0001H7C7.31476 10.0001 7.61115 9.85189 7.8 9.60008L10 6.66675Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M8.33325 2.98824L9.41066 1.91083C9.7361 1.58539 10.2637 1.58539 10.5892 1.91083L11.6666 2.98824M9.99992 4.58342V2.1549"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
