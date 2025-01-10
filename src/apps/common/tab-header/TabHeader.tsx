import { useSelector } from "react-redux";
import Breadcrumbs from "src/components/bread-crumbs/Breadcrumbs";
import { InputElement } from "src/components/inputs/Input";
import { DashboardIcon2 } from "src/icons";
import SearchIcon from "src/icons/SearchIcon";
import { hasEditAccess } from "src/redux/selectors/app";
import { VIEW_MODE } from "src/utils/constants";

type TabHeaderTypes = {
  label: string;
  subLabel?: string;
  onRefresh?: () => void;
  buttonLabel?: string;
  viewButton?: {
    view: VIEW_MODE;
    onClick: (val: VIEW_MODE) => void;
  };
  createButton?: {
    label: string;
    onClick: () => void;
  };
  exportButton?: {
    label: string;
    onClick: () => void;
  };
  printButton?: {
    label: string;
    onClick: () => void;
  };
  search?: {
    placeholder?: string;
    value: string | undefined;
    onChange: (val: string) => void;
  };
  showBreadcrumb?: boolean;
  onAddClick?: () => void;
};

const TabHeader = ({
  onRefresh,
  label,
  subLabel,
  buttonLabel,
  viewButton,
  createButton,
  exportButton,
  printButton,
  search,
  showBreadcrumb,
  onAddClick,
}: TabHeaderTypes) => {
  const hasEditPermission = useSelector(hasEditAccess);

  return (
    <div className="flex items-center justify-between gap-5 flex-wrap">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-26px font-bold">{label}</span>
          {/* <InfoTooltip content="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters," /> */}
        </div>
        {subLabel && (
          <span className="text-blue-dark text-sm font-light leading-[22px]">
            {subLabel}
          </span>
        )}
        {showBreadcrumb && (
          <div className="flex">
            <Breadcrumbs />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <DashboardIcon2 />
        <div className="text-[16px] font-[600] leading-[24px]">
          <span>Dashboard - Student</span>
        </div>
      </div>
    </div>
  );
};

export default TabHeader;

const SearchText = ({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (val: string) => void;
}) => {
  return (
    <InputElement
      className="!h-[40px] !rounded-[25px] !w-[280px] bg-white placeholder:text-lg"
      placeholder="Search..."
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};
<SearchIcon color="#8C8C8C" />;
