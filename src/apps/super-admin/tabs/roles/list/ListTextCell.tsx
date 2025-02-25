import { useMemo } from "react";

const ListTextCell = ({
  className,
  value,
}: {
  className?: string;
  value: string[];
}) => {
  const mappedData = useMemo(() => {
    return `${value.slice(0, 2).join(", ")} ${
      value.length > 2 ? `+${value.length - 2}` : ""
    }`;
  }, [value]);
  return <div className={className}>{mappedData}</div>;
};

export default ListTextCell;
