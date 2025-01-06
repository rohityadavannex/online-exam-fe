import { CopyIcon } from "src/icons/CopyIcon";

const Feature = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-[14px]">
      <CopyIcon className="h-7 w-7" />
      <div className="text-[16px]">{text}</div>
    </div>
  );
};

export default Feature;
