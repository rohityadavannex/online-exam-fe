import { ArrowDownIcon } from "./ArrowDownIcon";
import { ArrowUpIcon } from "./ArrowUpIcon";

export const SortingIcon = () => {
  return (
    <div className="flex flex-col gap-1">
      <ArrowUpIcon />
      <ArrowDownIcon />
    </div>
  );
};
