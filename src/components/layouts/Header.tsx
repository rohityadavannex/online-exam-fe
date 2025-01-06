import { PropsWithChildren } from "react";
import { MainLogoIcon } from "src/icons";
import ProfileV2 from "./ProfileV2";

const HeaderLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid h-auto">
      <div className="sticky top-0 z-40 lg:mx-auto lg:px-8 h-[94px] flex w-full items-center bg-white">
        <div className="flex h-16 items-center gap-x-4 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none w-full">
          <div className="flex h-16 shrink-0 items-center justify-center ">
            <div>
              <MainLogoIcon />
            </div>
          </div>
          <div className="  self-stretch lg:gap-x-6 w-full  items-center">
            <div className=" items-center gap-x-4 lg:gap-x-8">
              <ProfileV2 />
            </div>
          </div>
        </div>
      </div>
      <main
        className="flex py-[32px] bg-white-ghost h-full min-h-full"
        style={{ minHeight: "calc(100vh - 94px)" }}
      >
        <div className="flex px-4 sm:px-6 lg:px-8 min-h-full w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default HeaderLayout;
