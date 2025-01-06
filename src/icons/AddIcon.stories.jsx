import { AddIcon } from "./AddIcon";
import * as Icons from "./index";

export default {
  title: "icons/Add icon",
  component: AddIcon,
};

export const Examples = () => {
  return (
    <div className="grid grid-cols-8 gap-5 items-center ">
      {Object.keys(Icons).map((iconKey) => {
        const Icon = Icons[iconKey];
        return (
          <div className="flex flex-col gap-3 items-center justify-center">
            <div className="h-[30px] flex justify-center items-center">
              <Icon className="w-5 h-5" key={iconKey} color="#000000" />
            </div>
            {iconKey}
          </div>
        );
      })}
    </div>
  );
};
