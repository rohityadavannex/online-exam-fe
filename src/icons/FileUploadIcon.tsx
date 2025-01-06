import { IconType } from "./icons.types";

export const FileUploadIcon = ({ className, color }: IconType) => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.6269 21.4905L15.8693 19.2482C16.9738 18.1437 18.7644 18.1437 19.8689 19.2482L22.1112 21.4905M17.8691 18.6624V25.7327M29.1815 10.1782V11.5922H6.55671V7.35006C6.55671 5.00718 8.45598 3.10791 10.7989 3.10791H14.4318C15.3764 3.10791 16.2941 3.42322 17.0392 4.00385L18.369 5.04007C19.1142 5.6207 20.0318 5.93601 20.9765 5.93601H24.9393C27.2822 5.93601 29.1815 7.83528 29.1815 10.1782ZM5.81288 11.5922H29.9253C31.7258 11.5922 33.0679 13.2523 32.6906 15.0129L30.1396 26.9178C29.5807 29.5257 27.276 31.3889 24.6089 31.3889H11.1293C8.46215 31.3889 6.15746 29.5257 5.59862 26.9178L3.04756 15.0129C2.67031 13.2523 4.01239 11.5922 5.81288 11.5922Z"
        // stroke="#28303F"
        stroke={color}
        strokeWidth="1.13124"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
