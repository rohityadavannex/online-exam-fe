import classNames from "classnames";

const NestedNavigationByProps = ({
  activeTab,
  setActiveTab,
  tabs,
}: {
  activeTab: number;
  setActiveTab: (value: number) => void;
  tabs: { label: string; value: number }[];
}) => {
  return (
    <div className="flex gap-[5px] border-b border-[#A2A1A833] w-full">
      {tabs.map(({ label, value }) => (
        <div
          key={`tab-${value}`}
          onClick={() => setActiveTab(value)}
          className={classNames(
            "text-base px-[11px] pb-[11px] cursor-pointer border-primary",
            {
              "font-semibold text-primary border-b-[3px]": activeTab === value,
              "font-light text-blue-dark": activeTab !== value,
            }
          )}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default NestedNavigationByProps;
