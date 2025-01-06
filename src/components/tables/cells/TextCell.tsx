import classNames from "classnames";

const TextCell = ({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "flex justify-start text-[14px] xl:text-16px font-normal p-[10px]",
        className
      )}
    >
      <p className="line-clamp-2">{value}</p>
    </div>
  );
};

export default TextCell;
