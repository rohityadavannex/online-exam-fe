import classNames from "classnames";
import useDimension from "src/hooks/useDimension";
import Logo from "src/logo.svg";
import womanImage from "../../images/woman.png";

const PublicLayout = ({ children, leftSection = {} }) => {
  const { width } = useDimension();

  const shouldShowRightLayout = width > 1080;

  const showRightSideInfo = Object.keys(leftSection).length === 0;

  return (
    <div className="bg-[#F4F5F9] h-full flex items-center justify-center">
      <div
        className={classNames(
          "grid w-full max-w-[1280px] min-h-[800px] m-auto bg-white px-[25px] py-[29px] rounded-[30px] shadow-[0_4px_4px_0_#00000025]",
          {
            "grid-cols-2": shouldShowRightLayout,
            "grid-cols-1": !shouldShowRightLayout,
          }
        )}
      >
        <div className="flex justify-center items-center h-full w-full p-6">
          <div className="flex flex-col w-full justify-start gap-9">
            {!showRightSideInfo && (
              <div className="flex flex-col">
                <div className="text-28px font-bold">{leftSection.heading}</div>
                <p className="text-14px text-[#111827] font-400">
                  {leftSection.subHeading}
                </p>
              </div>
            )}
            {children}
          </div>
        </div>

        {shouldShowRightLayout && (
          <div className="bg-primary text-white w-full h-full flex p-8 rounded-[14px] relative">
            <div className="flex flex-col h-full">
              <img
                src={Logo}
                alt="Schoollog"
                width="68px"
                className="mt-[35px]"
              />
              <div className="font-semibold text-3xl max-w-[260px] mt-6">
                Best School ERP and LMS
              </div>
              <img
                src={womanImage}
                alt="feature-1"
                className="absolute bottom-0 right-0"
                width={"auto"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLayout;
