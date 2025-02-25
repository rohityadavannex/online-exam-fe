import { Input as AntdInput, InputProps } from "antd";
import classNames from "classnames";
import { PropsWithChildren } from "react";

const Input = ({
  wrapperClassName,
  required,
  ...rest
}: InputProps & {
  label?: string;
  error: string | undefined;
  wrapperClassName?: string;
}) => {
  return (
    <ElementWithWrapper
      name={rest.name}
      label={rest.label}
      error={rest.error}
      required={required}
      className={wrapperClassName}
    >
      <InputElement {...rest} />
    </ElementWithWrapper>
  );
};

export default Input;

export const InputElement = ({
  className,
  error,
  ...rest
}: InputProps & { error?: string }) => {
  return (
    <AntdInput
      className={classNames(
        "h-9 w-full px-5 rounded-lg border-lightGrey",
        className
      )}
      status={error && "error"}
      {...rest}
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
      <ErrorMessage text={error} />
    </div>
  );
};

export const ErrorMessage = ({ text }: { text?: string }) => {
  if (!text) return null;
  return <span className="text-xs text-red-500">{text}</span>;
};
