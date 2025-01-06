import classNames from "classnames";
import { FeedStepIcon } from "src/icons/FeedStepIcon";
import Card from "../common/Card";
import { dummyRecentActivity } from "./dummy-data";

const RecentActivity = ({ icon }: { icon?: React.ReactNode }) => {
  return (
    <Card
      title="Recent Activity Log"
      subTitle="Total Activity Log: 1200"
      icon={icon}
    >
      <Logs title="Today" />
      <Logs title="Tomorrow" />
    </Card>
  );
};

export default RecentActivity;

const Logs = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col">
      <HorizontalSeparator text={title} />
      <div className="flex flex-col py-[20px] px-[32px]">
        {dummyRecentActivity
          .slice(0, 3)
          .map(({ id, label, description }, index) => {
            return (
              <FeedItem
                key={id}
                label={label}
                description={description}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
};

const FeedItem = ({
  label,
  description,
  index,
}: {
  label: string;
  description: string;
  index: number;
}) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex flex-col items-center h-full">
        <div
          className={classNames("flex h-full w-[1px]", {
            "bg-white": index === 0,
            "!bg-solitude": index !== 0,
          })}
        ></div>
        <FeedStepIcon className="shrink-0" />
        <div className="flex h-full w-[1px] bg-solitude"></div>
      </div>
      <div className="flex flex-col py-[9px]">
        <div className="text-16px font-bold text-blue-raisin">{label}</div>
        <div className="text-14px font-semibold text-blue-darkMidnight">
          {description}
        </div>
      </div>
    </div>
  );
};

const HorizontalSeparator = ({
  className,
  text,
}: {
  className?: string;
  text?: string;
}) => {
  return (
    <div
      className={classNames(
        "h-[1px] bg-solitude relative flex justify-center items-center",
        className
      )}
    >
      <span className="absolute top-[-10px] bg-white px-6 text-14px font-normal">
        {text}
      </span>
    </div>
  );
};
