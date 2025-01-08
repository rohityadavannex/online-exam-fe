import { DatePicker as AntdDatePicker, DatePickerProps } from "antd";
import classNames from "classnames";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { ElementWithWrapper } from "../inputs/Input";
import "./calendar.scss";

function DatePicker({
  label,
  required,
  ...rest
}: DatePickerProps & { label?: string; error?: string }) {
  return (
    <ElementWithWrapper label={label} error={rest.error} required={required}>
      <DatePickerElement {...rest} />
    </ElementWithWrapper>
  );
}

export default DatePicker;

const DatePickerElement = ({
  className,
  error,
  ...rest
}: DatePickerProps & { error?: string }) => {
  return (
    <AntdDatePicker
      className={classNames(
        "h-9 w-full px-5 rounded-[10px] border-lightGrey",
        className
      )}
      status={error && "error"}
      {...rest}
    />
  );
};
