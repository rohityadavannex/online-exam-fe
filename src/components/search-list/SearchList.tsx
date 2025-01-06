import classNames from "classnames";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import usePrevious from "src/hooks/usePrevious";
import { ErrorMessage } from "../inputs/Input";

const SearchList = ({
  onSearch,
  onChange,
  label,
  value,
  required,
  error,
  icon,
  inputClassName,
  disabled,
  isLoading = false,
  placeholder = "Enter Phone Number",
}: {
  onSearch: (val: string) => { label: string; value: string | number }[];
  onChange: (val: string | number) => void;
  label?: string;
  value?: string;
  required?: boolean;
  error?: string;
  icon?: any;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  inputClassName?: string;
}) => {
  const [searchText, setSearchText] = useState(value ?? "");
  const [focus, setFocus] = useState(false);
  const prevSearchText = usePrevious(searchText);

  useEffect(() => {
    // modify list by search text
    if (prevSearchText !== searchText) {
      onSearch(searchText);
    }
  }, [onSearch, prevSearchText, searchText]);

  useEffect(() => {
    // change value when user select item
    value && setSearchText(value);
  }, [value]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <label
          htmlFor={"searchText"}
          className="block text-sm font-semibold leading-6 text-black-raisin"
        >
          {label}
        </label>
        {required && <span className="text-red-american">*</span>}
      </div>
      <div className={classNames("mt-2 relative")}>
        <input
          id="searchText"
          type="text"
          value={searchText}
          className={classNames(
            "h-[46px] px-[20px] w-full border border-lightGrey rounded-[5px]",
            inputClassName,
            {
              "pointer-events-none bg-white-ghost": disabled,
            }
          )}
          onChange={({ target: { value } }) => setSearchText(value)}
          onClick={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 500)}
          placeholder={placeholder}
        />

        {focus && (
          <div className="absolute top-12 max-h-36 overflow-y-scroll w-full bg-white scrollbar-thin rounded-lg z-10 shadow-[0_4px_40px_-2px_rgba(91,94,105,.15)]">
            {isLoading ? (
              <Skeleton count={3} height={44} />
            ) : (
              <>
                {!isLoading && !onSearch(searchText)?.length ? (
                  <div className="px-4 py-5 flex items-center justify-center">
                    No Data Found
                  </div>
                ) : (
                  <ul>
                    {onSearch(searchText)?.map((item) => (
                      <li
                        key={`${item.label}-${item.value}`}
                        onClick={() => onChange(item.value)}
                        className="px-4 py-2.5 hover:bg-white-ghost cursor-pointer flex gap-3 "
                      >
                        <>{icon}</>
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {error && <ErrorMessage text={error} />}
    </div>
  );
};

export default SearchList;
