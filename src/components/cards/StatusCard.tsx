import ErrorIcon from "src/icons/ErrorIcon";
import SuccessIcon from "../../icons/SuccessIcon";

const StatusCard = ({
  title,
  subtitle,
  error = false,
}: {
  title?: string;
  subtitle?: string;
  error?: boolean;
}) => {
  return (
    <div className="flex flex-col p-8 rounded-[10px] shadow-md items-center gap-[25px]">
      {error ? <ErrorIcon /> : <SuccessIcon />}
      <div className="font-bold text-28px text-nero">
        {title ?? "Successful"}
      </div>
      <p className="text-center text-14px text-grayishBlue">
        {subtitle ?? "Changes have been made successfully"}
      </p>
    </div>
  );
};

export default StatusCard;
