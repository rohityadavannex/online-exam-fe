import { IconType } from "./icons.types";

export const DeleteIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className={className}
    >
      <g opacity="0.6">
        <path
          d="M3.125 5V11.25C3.125 12.6307 4.24429 13.75 5.625 13.75H9.375C10.7557 13.75 11.875 12.6307 11.875 11.25V5M8.75 6.875V10.625M6.25 6.875L6.25 10.625M10 3.125L9.12108 1.80662C8.88925 1.45888 8.49896 1.25 8.08102 1.25H6.91898C6.50104 1.25 6.11075 1.45888 5.87892 1.80662L5 3.125M10 3.125H5M10 3.125H13.125M5 3.125H1.875"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
