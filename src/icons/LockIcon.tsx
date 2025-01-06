import { IconType } from "./icons.types";

export const LockIcon = ({ className, color = "#28303F" }: IconType) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="3.16663"
        y="6.2514"
        width="12.6667"
        height="11.0833"
        rx="4"
        stroke={color}
      />
      <ellipse
        cx="9.49996"
        cy="11.7931"
        rx="1.58333"
        ry="1.58333"
        stroke={color}
      />
      <path
        d="M12.6667 6.25138C12.6667 4.50248 11.2489 3.08472 9.50004 3.08472C7.75114 3.08472 6.33337 4.50248 6.33337 6.25138"
        stroke={color}
      />
    </svg>
  );
};
