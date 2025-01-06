import classNames from "classnames";
import { ReactNode, useMemo } from "react";
import Tooltip from "../tooltip/Tooltip";

type ButtonType = {
  type?: "button" | "submit";
  text?: string | number;
  className?: string;
  onClick?: (e: any) => void;
  isDisabled?: boolean;
  //TODO - remove these primary and secondary prop with single prop btnType
  primary?: boolean;
  danger?: boolean;
  icon?: (color?: string) => ReactNode;
  tooltip?: string;
  ghost?: boolean;
};

const ButtonV1 = ({
  type = "button",
  text,
  className,
  onClick,
  isDisabled = false,
  primary = false,
  danger = false,
  icon,
  tooltip,
  ghost,
}: ButtonType) => {
  const buttonColor = useMemo(() => {
    if (ghost) {
      return "#FFFFFF";
    }
    if (primary) {
      return "#FFFFFF";
    }
    if (danger) {
      return "#FC544B";
    }
    return "var(--primary-color)";
  }, [danger, ghost, primary]);

  return (
    <Tooltip content={tooltip} disabled={!tooltip}>
      <button
        type={type}
        className={classNames(
          "flex justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 bg-white focus-visible:outline-2 h-12 gap-2 border-[1px] flex-nowrap truncate",
          className,
          { "!opacity-50 hover:!bg-none !cursor-not-allowed": isDisabled },
          {
            "!bg-primary !text-white hover:!bg-primary-800": primary && !ghost,
          },
          { "!bg-red-sunset !text-white": danger && !ghost },
          {
            "!bg-transparent !text-primary outline-1 !outline-primary !border-primary hover:bg-opacity-500":
              ghost && !danger && !primary,
          },
          {
            "!bg-transparent !text-red-sunset !border-red-sunset":
              ghost && danger,
          },
          {
            "!bg-transparent !text-primary !border-primary": ghost && primary,
          }
        )}
        onClick={(e) => {
          if (!isDisabled) {
            onClick?.(e);
          }
        }}
      >
        
      </button>
    </Tooltip>
  );
};

export default ButtonV1;
