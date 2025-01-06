import classNames from "classnames";
import { useMemo } from "react";
import { ElementWithWrapper } from "../inputs/Input";
import Tooltip from "../tooltip/Tooltip";
import "./toggle.css";

type ToggleType = {
  checked?: boolean;
  label?: string;
  onToggle: (val: boolean) => void;
  disabled?: boolean;
  showToggleStatus?: boolean;
  tooltip?: string;
};

const Toggle = ({
  label,
  checked = false,
  onToggle,
  disabled = false,
  showToggleStatus,
  tooltip,
}: ToggleType) => {
  const toggleBtn = useMemo(() => {
    return (
      <Tooltip content={tooltip} disabled={!tooltip}>
        <div className="flex flex-col gap-1 w-fit">
          <label className={classNames("switch")}>
            <input
              type="checkbox"
              onClick={() => {
                if (!disabled) {
                  onToggle(!checked);
                }
              }}
            />
            <span
              className={classNames(
                "slider round",
                {
                  "bg-primary before:translate-x-[19px]": checked,
                },
                {
                  "!cursor-not-allowed !opacity-50": disabled,
                }
              )}
            ></span>
          </label>
          {showToggleStatus && (
            <div className="text-xs font-semibold text-center">
              {checked ? "Active" : "Inactive"}
            </div>
          )}
        </div>
      </Tooltip>
    );
  }, [checked, disabled, onToggle, showToggleStatus, tooltip]);

  if (!!label) {
    return <ElementWithWrapper label={label}>{toggleBtn}</ElementWithWrapper>;
  }

  return toggleBtn;
};

export default Toggle;
