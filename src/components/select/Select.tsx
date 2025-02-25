import { Select as AntdSelect, SelectProps } from "antd";
import classNames from "classnames";
import { PropsWithChildren } from "react";

const Select = ({
  wrapperClassName,
  ...rest
}: SelectProps & {
  label?: string;
  name: string;
  required?: boolean;
  error?: string;
  wrapperClassName?: string;
}) => {
  return (
    <ElementWithWrapper
      name={rest.name}
      label={rest.label}
      error={rest.error}
      required={rest.required}
      className={wrapperClassName}
    >
      <SelectElement status={rest.error ? "error" : undefined} {...rest} />
    </ElementWithWrapper>
  );
};

export default Select;

export const SelectElement = (props: SelectProps) => {
  return (
    <AntdSelect
      className={classNames(
        "h-9 w-full rounded-[10px] border-lightGrey",
        props.className
      )}
      {...props}
    />
  );
};

export const ElementWithWrapper = ({
  name,
  label,
  children,
  error,
  required = false,
  className,
}: PropsWithChildren<{
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}>) => {
  return (
    <div className={className}>
      <div className={"flex items-center gap-2"}>
        <label
          htmlFor={name}
          className="block text-sm font-semibold leading-6 text-black-raisin"
        >
          {label}
        </label>
        {required && <span className="text-red-american">*</span>}
      </div>
      <div className={classNames({ "mt-2": !!label })}>{children}</div>
      {error && <ErrorMessage text={error} />}
    </div>
  );
};

export const ErrorMessage = ({ text }: { text?: string }) => {
  if (!text) return null;
  return <span className="text-xs text-red-500">{text}</span>;
};
