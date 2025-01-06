const Status = ({
  label,
  color,
  bgColor,
}: {
  label: string;
  color: string;
  bgColor: string;
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="px-4 py-[5px] inline-block items-center justify-center rounded-[4.5px]"
        style={{ backgroundColor: bgColor }}
      >
        <span
          className="font-bold text-[12px] leading-normal text-center"
          style={{ color }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default Status;
