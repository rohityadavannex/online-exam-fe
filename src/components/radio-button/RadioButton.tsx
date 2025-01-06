import { Radio as AntdRadio, RadioProps } from "antd";
import classNames from "classnames";
import { PropsWithChildren } from "react";

const RadioButton = ({
  wrapperClassName,
  required,
  ...rest
}: RadioProps & {
  label?: string;
  error: string | undefined;
  wrapperClassName?: string;
  options: { label: string; value: string | number }[];
}) => {
  return (
    <ElementWithWrapper
      name={rest.name}
      label={rest.label}
      error={rest.error}
      required={required}
      className={wrapperClassName}
    >
      <RadioElement {...rest} />
    </ElementWithWrapper>
  );
};

export default RadioButton;

export const RadioElement = ({
  className,
  error,
  onChange,
  value,
  options,
  ...rest
}: RadioProps & {
  error?: string;
  options: { label: string; value: string | number }[];
}) => {
  return (
    <AntdRadio.Group
      onChange={onChange}
      value={value}
      className={className}
      {...rest}
    >
      {options.map(({ label, value }) => (
        <AntdRadio key={value} value={value}>
          {label}
        </AntdRadio>
      ))}
    </AntdRadio.Group>
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
