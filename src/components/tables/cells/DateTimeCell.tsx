import classNames from "classnames";
import DateCell from "./DateCell";
import TimeCell from "./TimeCell";

const DateTimeCell = ({
  value,
  className,
}: {
  value: string;
  className: string;
}) => {
  return (
    <div className={classNames("flex gap-1 justify-center", className)}>
      <DateCell value={value} className="!pr-0" />
      <TimeCell value={value} className="!pl-0" />
    </div>
  );
};

export default DateTimeCell;
