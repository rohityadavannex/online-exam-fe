import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownIcon } from "src/icons/ArrowDownIcon";
import SearchIcon from "src/icons/SearchIcon";
import {
  ElementWithWrapper,
  ErrorMessage,
  InputElement,
} from "../inputs/Input";
import Tooltip from "../tooltip/Tooltip";
import ContextDropdown from "./ContextDropdown";

type DropdownOptionsType = {
  label: string | number;
  value: number | string;
  isDisabled?: boolean;
};

const Dropdown = ({
  label,
  placeholder,
  wrapperClassName,
  options,
  value,
  onChange,
  className,
  disabled = false,
  error,
  required = false,
  isLoading,
}: {
  label?: string;
  placeholder?: string;
  wrapperClassName?: string;
  options: DropdownOptionsType[];
  value: string | number | undefined;
  onChange: (val: string | number) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  isLoading?: boolean;
}) => {
  const selectedOption = useMemo(() => {
    return options.find((item) => item.value === value);
  }, [options, value]);

  const labelText = useMemo(
    () => selectedOption?.label ?? placeholder,
    [placeholder, selectedOption?.label]
  );

  const dropdownElem = useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        <ContextDropdown
          placement="bottom"
          content={
            !disabled && (
              <DropdownContent
                options={options}
                value={value}
                onClick={(val) => onChange(val)}
                isLoading={isLoading}
              />
            )
          }
          className="w-full"
        >
          <div
            className={classNames(
              "flex items-center justify-between gap-2 border-[1px] border-lightGrey h-[46px] rounded-[5px] px-[20px] cursor-pointer",
              { "bg-white-ghost !cursor-not-allowed": disabled },
              className
            )}
            onClick={() => {
              if (disabled) {
                return;
              }
            }}
          >
            <p className="text-grayishBlue truncate">{labelText} </p>
            <ArrowDownIcon color="#28303F" className="shrink-0" />
          </div>
        </ContextDropdown>
        <ErrorMessage text={error} />
      </div>
    );
  }, [
    className,
    disabled,
    error,
    isLoading,
    labelText,
    onChange,
    options,
    value,
  ]);

  if (label) {
    return (
      <ElementWithWrapper
        label={label}
        className={wrapperClassName}
        required={required}
      >
        {dropdownElem}
      </ElementWithWrapper>
    );
  }

  return dropdownElem;
};

export default Dropdown;

const DropdownContent = ({
  options,
  onClick,
  value: selectedValue,
  isLoading,
}: {
  options: DropdownOptionsType[];
  onClick: (val: number | string) => void;
  value: string | number | undefined;
  isLoading?: boolean;
}) => {
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setDropdownOptions(
      options.filter(({ label }) =>
        label?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [options, searchText]);

  const loading = useMemo(
    () => (
      <div className="flex justify-center items-center h-[50px] font-semibold">
        Loading...
      </div>
    ),
    []
  );

  const hasData = useMemo(() => dropdownOptions.length, [dropdownOptions]);
  const noData = useMemo(
    () => (
      <div className="flex justify-center items-center h-[50px] font-semibold">
        No Data Found
      </div>
    ),
    []
  );

  const content = useMemo(() => {
    if (isLoading) {
      return loading;
    }
    if (!hasData) return noData;
    return dropdownOptions.map(({ label, value, isDisabled }, index, arr) => {
      const isLastElement = index === arr.length - 1;
      return (
        <Tooltip
          disabled={!isDisabled}
          content={isDisabled ? "This option is disabled." : ""}
        >
          <div
            key={index}
            className={classNames(
              "flex items-center py-[9px] px-[20px] gap-2 cursor-pointer hover:bg-white-ghost text-14px font-normal",
              { "border-b-[1px]": !isLastElement },
              { "bg-white-ghost": value === selectedValue },
              { "text-red-600": isDisabled }
            )}
            onClick={() => {
              if (isDisabled) return null;
              return onClick(value);
            }}
          >
            {label}
          </div>
        </Tooltip>
      );
    });
  }, [
    dropdownOptions,
    hasData,
    isLoading,
    loading,
    noData,
    onClick,
    selectedValue,
  ]);

  return (
    <div className="flex flex-col py-2 rounded-14px max-h-80 overflow-y-auto w-full">
      <div className="px-2 mb-[15px]">
        <InputElement
          name="dropdown"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          className="!h-[32px] !px-2"
          icon={(className) => (
            <SearchIcon
              className={classNames(className, "h-[16px] w-[16px]")}
              color="#16151C"
            />
          )}
        />
      </div>
      {content}
    </div>
  );
};
