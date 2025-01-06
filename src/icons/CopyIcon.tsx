import classNames from "classnames";
import { IconType } from "./icons.types";

export const CopyIcon = ({ className }: IconType) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(className, "shrink-0")}
    >
      <path
        d="M16.6665 16.6667V12.5C16.6665 7.89762 20.3975 4.16666 24.9998 4.16666L37.4998 4.16666C42.1022 4.16666 45.8332 7.89762 45.8332 12.5V25C45.8332 29.6024 42.1022 33.3333 37.4998 33.3333H33.3332M16.6665 16.6667H12.4998C7.89746 16.6667 4.1665 20.3976 4.1665 25V37.5C4.1665 42.1024 7.89746 45.8333 12.4998 45.8333H24.9998C29.6022 45.8333 33.3332 42.1024 33.3332 37.5V33.3333M16.6665 16.6667H24.9998C29.6022 16.6667 33.3332 20.3976 33.3332 25V33.3333"
        stroke="#EAD8D8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
