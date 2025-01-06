import { useCallback, useMemo } from "react";
import { TAB_NAMES } from "src/apps/common/menu-navigation/menuNavigation";
import HorizontalSeparator from "src/components/seperators/HorizontalSeperator";
import Toggle from "src/components/toggles/Toggle";
import { CheckBoxIcon } from "src/icons/CheckboxIcon";
import { PLANS_FEATURES } from "src/utils/constants";

const FeaturesCard = ({
  selectedFeatures = [],
  setSelectedFeatures,
}: {
  selectedFeatures: string[];
  setSelectedFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const isAllSelected = useMemo(() => {
    return selectedFeatures.length === FEATURES_LIST.length;
  }, [selectedFeatures.length]);

  const handleToggle = useCallback(
    (feature: string) => {
      if (selectedFeatures.includes(feature)) {
        setSelectedFeatures(
          selectedFeatures.filter((item) => feature !== item)
        );
      } else {
        setSelectedFeatures([...selectedFeatures, feature]);
      }
    },
    [selectedFeatures, setSelectedFeatures]
  );

  return (
    <div className="flex flex-col border-[1px] p-[20px] rounded-md">
      <div className="flex justify-between gap-4 items-center">
        <div className="font-semibold text-lg">Features</div>
        <div className="flex items-center gap-2">
          <CheckBoxIcon
            checked={isAllSelected}
            onClick={() =>
              setSelectedFeatures(
                isAllSelected ? [] : (FEATURES_LIST as string[])
              )
            }
          />{" "}
          <span className="font-semibold text-sm">Select All</span>
        </div>
      </div>
      <div className="flex justify-between gap-4 items-center mt-[42px]">
        <div className="font-semibold text-base">Administrator Access</div>
        <span className="font-semibold text-sm">Enable/Disable</span>
      </div>
      <HorizontalSeparator className="my-[14px]" />
      <div className="flex flex-col gap-[20px]">
        {PLANS_FEATURES.map(({ label, value }) => {
          return (
            <div
              key={value}
              className="flex justify-between gap-4 items-center"
            >
              <span className="font-semibold text-sm">{label}</span>
              <Toggle
                checked={selectedFeatures.includes(value)}
                onToggle={() => handleToggle(value)}
                showToggleStatus
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesCard;

const FEATURES_LIST = [
  TAB_NAMES.DASHBOARD,
  TAB_NAMES.ROLES,
  TAB_NAMES.USERS,
  TAB_NAMES.PLANS,
];
