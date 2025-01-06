import Toggle from "src/components/toggles/Toggle";

const StatusCell = ({
  value,
  onChange,
  disabled,
  tooltip,
}: {
  value: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
  tooltip?: string;
}) => {
  return (
    <div className="flex justify-center items-center">
      <Toggle
        checked={value}
        onToggle={onChange}
        showToggleStatus
        disabled={disabled}
        tooltip={tooltip}
      />
    </div>
  );
};

export default StatusCell;
