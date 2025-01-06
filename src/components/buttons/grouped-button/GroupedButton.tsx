import classNames from "classnames";
import { ReactNode } from "react";
import ButtonV1 from "../ButtonV1";

type GroupedButtonTypes = {
  options: {
    icon: ReactNode;
    tooltip?: string;
    onClick: () => void;
    disabled?: boolean;
  }[];
};

const GroupedButton = ({ options }: GroupedButtonTypes) => {
  return (
    <div className="flex max-h-[32px]">
      {options.map(({ icon: Icon, tooltip, onClick, disabled }, index, arr) => {
        const isFirst = index === 0;
        const isLast = index === arr.length - 1;
        return (
          <ButtonV1
            key={index}
            icon={() => <Icon />}
            className={classNames(
              "shadow-none shrink-0 rounded-none h-[32px] bg-blue-alice",
              {
                "border-l-0": !isFirst,
                "rounded-l-md": isFirst,
              },
              { "rounded-r-md": isLast }
            )}
            tooltip={tooltip}
            onClick={onClick}
            isDisabled={disabled}
          />
        );
      })}
    </div>
  );
};

export default GroupedButton;
