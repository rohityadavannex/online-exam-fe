import { ReactNode } from "react";
import { InfoIcon } from "src/icons/InfoIcon";
import Tooltip from "./Tooltip";

const InfoTooltip = ({ content }: { content?: string | ReactNode }) => {
  return (
    <Tooltip content={content}>
      <InfoIcon className="cursor-pointer" />
    </Tooltip>
  );
};

export default InfoTooltip;
