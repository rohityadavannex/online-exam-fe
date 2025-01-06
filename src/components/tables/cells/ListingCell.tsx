import { useMemo } from "react";
import TextCell from "src/components/tables/cells/TextCell";

const ListingCell = ({
  value,
  className,
}: {
  value: string[];
  className?: string;
}) => {
  const mappedData = useMemo(() => {
    return `${value.slice(0, 2).join(",")} ${
      value.length > 2 ? `+${value.length - 2}` : ""
    }`;
  }, [value]);
  return <TextCell value={mappedData} className={className} />;
};

export default ListingCell;
