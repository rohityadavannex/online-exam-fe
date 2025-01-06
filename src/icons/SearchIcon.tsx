import { IconType } from "./icons.types";

const SearchIcon = ({ className, color }: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      className={className}
    >
      <path
        d="M8.2727 2.25C7.18041 2.25 6.11266 2.5739 5.20445 3.18074C4.29625 3.78758 3.58839 4.65011 3.17039 5.65925C2.75239 6.66839 2.64303 7.77882 2.85612 8.85012C3.06921 9.92142 3.5952 10.9055 4.36756 11.6778C5.13993 12.4502 6.12398 12.9762 7.19527 13.1893C8.26657 13.4024 9.377 13.293 10.3861 12.875C11.3953 12.457 12.2578 11.7491 12.8647 10.8409C13.4715 9.93274 13.7954 8.86498 13.7954 7.7727C13.7953 6.30801 13.2134 4.90335 12.1777 3.86766C11.142 2.83198 9.73738 2.25009 8.2727 2.25Z"
        stroke={color}
        strokeWidth="1.125"
        strokeMiterlimit="10"
      />
      <path
        d="M12.393 11.8931L16.25 15.7501"
        stroke={color}
        strokeWidth="1.125"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
