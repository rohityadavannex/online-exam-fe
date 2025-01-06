import classNames from "classnames";
import { PropsWithChildren } from "react";

type CardHeaderType = {
  title: string;
  subTitle: string;
  icon?: React.ReactNode;
};

const Card = ({
  children,
  title,
  subTitle,
  className,
  icon,
}: PropsWithChildren<CardHeaderType & { className?: string }>) => {
  return (
    <div className={classNames("flex flex-col bg-white rounded-xl", className)}>
      <CardHeader title={title} subTitle={subTitle} icon={icon} />
      {children}
    </div>
  );
};

export default Card;

export const CardHeader = ({ title, subTitle, icon }: CardHeaderType) => {
  return (
    <div className=" flex justify-between py-[20px] px-[32px]">
      <div className="flex flex-col">
        <div className="text-22px font-bold text-black-raisin">{title}</div>
        <div className="flex text-14px text-black-coral">{subTitle}</div>
      </div>
      <div className="flex items-center justify-between">{icon}</div>
    </div>
  );
};
