import { IconType } from "./icons.types";

export const ViewIcon = ({ className, color = "#202224" }: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      className={className}
    >
      <g opacity="0.6">
        <path
          d="M16.7281 7.80041C17.6462 8.7663 17.6462 10.2338 16.7281 11.1997C15.1798 12.8287 12.5206 15.0417 9.49998 15.0417C6.47936 15.0417 3.82016 12.8287 2.27183 11.1997C1.35381 10.2338 1.35381 8.7663 2.27183 7.80041C3.82016 6.17135 6.47936 3.95837 9.49998 3.95837C12.5206 3.95837 15.1798 6.17135 16.7281 7.80041Z"
          stroke={color}
        />
        <path
          d="M11.875 9.50004C11.875 10.8117 10.8117 11.875 9.49998 11.875C8.1883 11.875 7.12498 10.8117 7.12498 9.50004C7.12498 8.18836 8.1883 7.12504 9.49998 7.12504C10.8117 7.12504 11.875 8.18836 11.875 9.50004Z"
          stroke={color}
        />
      </g>
    </svg>
  );
};