import classNames from "classnames";
import { useMemo } from "react";

enum OrganizationStatusEnum {
  PROCESSING = 1,
  IN_TRANSIT = 2,
  REJECTED = 3,
  COMPLETED = 4,
}

const OrganizationStatusLabels = {
  PROCESSING: "Processing",
  IN_TRANSIT: "In Transit",
  REJECTED: "Rejected",
  COMPLETED: "Completed",
};

const status = [
  {
    value: OrganizationStatusEnum.PROCESSING,
    label: OrganizationStatusLabels.PROCESSING,
  },
  {
    value: OrganizationStatusEnum.IN_TRANSIT,
    label: OrganizationStatusLabels.IN_TRANSIT,
  },
  {
    value: OrganizationStatusEnum.REJECTED,
    label: OrganizationStatusLabels.REJECTED,
  },
  {
    value: OrganizationStatusEnum.COMPLETED,
    label: OrganizationStatusLabels.COMPLETED,
  },
];

const StatusCell = ({ value }: { value: number }) => {
  const label = useMemo(
    () => status.find((item) => item.value === value)?.label,
    [value]
  );

  return (
    <div className="flex justify-center">
      <div
        className={classNames(
          "flex justify-center items-center h-[27px] px-[16px] rounded-[4.5px] text-xs font-bold",
          getStatusStyle(value)
        )}
      >
        {label}
      </div>
    </div>
  );
};

export default StatusCell;

const getStatusStyle = (value: number) => {
  switch (value) {
    case OrganizationStatusEnum.PROCESSING:
      return "text-violet bg-violet bg-opacity-20";
    case OrganizationStatusEnum.IN_TRANSIT:
      return "text-purple-electric bg-purple-electric bg-opacity-20";
    case OrganizationStatusEnum.REJECTED:
      return "text-orange-sunset bg-orange-sunset bg-opacity-20";
    case OrganizationStatusEnum.COMPLETED:
      return "text-green-mediumTeal bg-green-mediumTeal bg-opacity-20";
  }
};
