import classNames from "classnames";
import { NavLink } from "react-router-dom";

const NestedNavigation = ({
  tabs,
}: {
  tabs: { label: string; href: string }[];
}) => {
  return (
    <div className="flex gap-[5px] border-b border-[#A2A1A833] w-full">
      {tabs.map(({ label, href }) => (
        <NavLink
          key={`tab-${href}`}
          to={href}
          className={(props) =>
            classNames(
              "text-base px-[11px] pb-[11px] cursor-pointer border-primary",
              {
                "font-semibold text-primary border-b-[3px]": props.isActive,
                "font-light text-blue-dark": !props.isActive,
              }
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default NestedNavigation;
