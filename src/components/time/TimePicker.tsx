import classNames from "classnames";
import { generateRandomId } from "src/helpers/helpers";
import { ElementWithWrapper } from "../inputs/Input";

function TimePicker({
  label,
  disabled,
  value,
  onChange,
  className,
  error,
  id,
  name,
  required,
}: {
  label: string;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  id?: string;
  name?: string;
  required?: boolean;
}) {
  return (
    <ElementWithWrapper label={label} error={error} required={required}>
      <input
        type="time"
        id={id ?? generateRandomId()}
        name={name}
        value={value}
        onChange={onChange}
        className={classNames(
          "flex items-center h-[46px] w-full px-[20px] rounded-[5px] border-[1px] border-lightGrey gap-3",
          { "bg-white-ghost cursor-not-allowed": disabled },
          className
        )}
      />
    </ElementWithWrapper>
  );
}

export default TimePicker;
