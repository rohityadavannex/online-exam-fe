import classNames from "classnames";
import { IconType } from "./icons.types";

export const CheckBoxIcon = ({
  checked = false,
  onClick,
  className,
}: {
  checked?: boolean;
  onClick: (value: boolean) => void;
  className?: string;
}) => {
  const commonCss = classNames("h-6 w-6 cursor-pointer", className);
  return (
    <div onClick={() => onClick(!checked)}>
      {checked ? (
        <CheckedBoxIcon className={commonCss} />
      ) : (
        <UnCheckboxIcon className={commonCss} />
      )}
    </div>
  );
};

export const UnCheckboxIcon = ({ className }: IconType) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 2.86047H18C20.2091 2.86047 22 4.65133 22 6.86047V18.8605C22 21.0696 20.2091 22.8605 18 22.8605H6C3.79086 22.8605 2 21.0696 2 18.8605V6.86047C2 4.65134 3.79086 2.86047 6 2.86047Z"
        stroke="#D1D1D1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CheckedBoxIcon = ({ className }: IconType) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 2.52715H5.00001C3.15906 2.52715 1.66667 4.01953 1.66667 5.86048V15.8605C1.66667 17.7014 3.15906 19.1938 5.00001 19.1938H15C16.841 19.1938 18.3333 17.7014 18.3333 15.8605V5.86048C18.3333 4.01953 16.841 2.52715 15 2.52715ZM13.8267 8.74422C14.0386 8.47175 13.9895 8.07908 13.7171 7.86716C13.4446 7.65524 13.0519 7.70433 12.84 7.97679L9.50083 12.27C9.42658 12.3655 9.28691 12.3779 9.19701 12.297L7.08478 10.3959C6.82821 10.165 6.43303 10.1858 6.20212 10.4424C5.97121 10.699 5.99201 11.0942 6.24857 11.3251L8.36081 13.2261C8.99008 13.7924 9.96776 13.7057 10.4875 13.0374L13.8267 8.74422Z"
        fill="#3774FF"
      />
    </svg>
  );
};
