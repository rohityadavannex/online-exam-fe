import { IconType } from "./icons.types";

export const FilterIcon = ({ className, color = "#000000" }: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M6.6431 9.37957C4.77676 7.9842 3.44673 6.44936 2.72051 5.5865C2.4957 5.3194 2.42204 5.12392 2.37775 4.7796C2.22608 3.6006 2.15026 3.0111 2.49596 2.63055C2.84168 2.25 3.45303 2.25 4.67575 2.25H13.3243C14.547 2.25 15.1583 2.25 15.504 2.63055C15.8498 3.0111 15.7739 3.6006 15.6223 4.77961C15.578 5.12393 15.5043 5.3194 15.2795 5.5865C14.5523 6.45046 13.2196 7.98803 11.3495 9.38513C11.1803 9.51158 11.0687 9.71753 11.048 9.94605C10.8628 11.994 10.6919 13.1157 10.5856 13.6831C10.414 14.5993 9.1149 15.1505 8.4195 15.6422C8.00558 15.935 7.50323 15.5865 7.44959 15.1333C7.34732 14.2696 7.15471 12.5148 6.94445 9.94605C6.92557 9.71543 6.81365 9.50707 6.6431 9.37957Z"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};