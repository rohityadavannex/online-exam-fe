import classNames from "classnames";
import { ReactNode } from "react";
import { formatNumber } from "src/helpers/helpers";

const KpiCard = ({
  title,
  count,
  icon,
  bgColorBox,
  bgColorClassname,
  subTitle,
  subTitleColor,
}: {
  title: string;
  count: number;
  icon: ReactNode;
  bgColorBox: string;
  bgColorClassname: string;
  subTitle: string;
  subTitleColor: string;
}) => {
  const isPositive = true;
  return (
    <div
      className={classNames(
        "flex flex-col p-[21px] rounded-14px bg-white gap-[14px]",
        bgColorClassname
      )}
    >
      <div className="flex gap-[12px] items-center">
        <div
          className={classNames(
            "flex justify-center items-center w-[64px] h-[64px] rounded-md bg-white"
          )}
        >
          <div
            className={classNames(
              "w-[40px] h-[40px] rounded-[10px] flex justify-center items-center",
              bgColorBox
            )}
          >
            <div className="font fill-white">{icon}</div>
          </div>
        </div>
        <div className="flex flex-col leading-[44px]">
          <div className="text-[16px] font-semibold text-black">{title}</div>
          <div className="text-[32px] font-[600] leading-[24px] text-black-raisin">
            <span className="">{formatNumber(count)}</span>
          </div>
          <div className="flex gap-2 text-[14px] items-center font-semibold">
            <span className="text-black">Increase by </span>
            <span
              className={classNames(
                "leading-[24px]",
                {
                  "text-[#16A34A]": subTitle.startsWith("+"),
                  "text-[#DC2626]": subTitle.startsWith("-"),
                },
                subTitleColor
              )}
            >
              {subTitle}
            </span>
            <span className="text-black">this week</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
