import { getFormattedTime } from "src/helpers/helpers";
import TextCell from "./TextCell";

const TimeCell = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  const time = getFormattedTime(value);
  return <TextCell value={time} className={className} />;
};

export default TimeCell;
