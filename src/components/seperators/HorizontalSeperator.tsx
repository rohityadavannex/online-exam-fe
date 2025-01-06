import classNames from "classnames";

const HorizontalSeparator = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        "w-full bg-gradient-to-r bg-[#F4F7FE] h-[1px] py-[1px]",
        className
      )}
    ></div>
  );
};

export default HorizontalSeparator;
