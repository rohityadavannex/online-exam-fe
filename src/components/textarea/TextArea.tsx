import { Input as AntdInput, InputProps } from "antd";
import { TextAreaProps } from "antd/es/input";
import classNames from "classnames";
import { PropsWithChildren } from "react";

const { TextArea: AntTextArea } = AntdInput;

const TextArea = ({
  wrapperClassName,
  ...rest
}: TextAreaProps & {
  label: string;
  error: string | undefined;
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
      <AntTextArea {...rest} />
    </ElementWithWrapper>
  );
};

export default TextArea;

export const TextAreaWithoutLabel = (props: InputProps) => {
  return (
    <AntdInput
      className={classNames(
        "h-[46px] w-full px-5 rounded-[10px] border-lightGrey",
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
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
}>) => {
  return (
    <div>
      <div className={classNames("flex items-center gap-2", className)}>
        <label
          htmlFor={name}
          className="block text-sm font-semibold leading-6 text-black-raisin"
        >
          {label}
        </label>
        {required && <span className="text-red-american">*</span>}
      </div>
      <div className="mt-2">{children}</div>
      {error && <ErrorMessage text={error} />}
    </div>
  );
};

export const ErrorMessage = ({ text }: { text?: string }) => {
  if (!text) return null;
  return <span className="text-xs text-red-500">{text}</span>;
};
