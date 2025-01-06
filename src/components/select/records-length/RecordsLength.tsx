import { SelectProps } from "antd/es/select";
import classNames from "classnames";
import Select from "../Select";

const Options = [
  { value: "10", label: "10" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
  { value: "500", label: "500", disabled: true },
];

const RecordsLength = ({
  className,
  defaultValue = "10",
  name,
  options = Options,
  ...rest
}: SelectProps & {
  error?: string;
  label?: string;
  name: string;
  required?: boolean;
}) => {
  return (
    <div className={classNames("flex items-center gap-2", className)}>
      <span className="text-base font-semibold">Show</span>
      <Select
        name={name}
        defaultValue={defaultValue}
        options={options}
        className="h-8"
        {...rest}
      />
    </div>
  );
};

export default RecordsLength;
