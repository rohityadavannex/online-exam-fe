import classNames from "classnames";
import { isEqual } from "lodash";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoleName } from "src/helpers/helpers";
import usePrevious from "src/hooks/usePrevious";
import { ArrowDownIcon, MainLogoIcon, ToggleIcon, UserIcon2 } from "src/icons";
import { getActiveTab, getCurrentUserInfo } from "../../redux/selectors/app";
import useGetNav from "./useGetNav";

const Sidebar = () => {
  const activeTab = useSelector(getActiveTab);

  const { navigationTabs } = useGetNav();
  const previousNavTabs = usePrevious(navigationTabs);
  const [menu, setMenu] = useState(expandOnInit(navigationTabs));

  useEffect(() => {
    if (!isEqual(navigationTabs, previousNavTabs)) {
      setMenu(navigationTabs);
    }
  }, [navigationTabs, previousNavTabs]);

  function isChildActive(children) {
    if (!children) return false;
    for (const element of children) {
      if (activeTab === element.name) {
        return true;
      }
    }
  }

  function expandOnInit(tabs) {
    return tabs.map((tab) =>
      isChildActive(tab.children) ? (tab.expanded = true) : tab
    );
  }

  const handleExpandClick = (i) => {
    const newMenu = menu.map((m, index) => {
      if (i === index) {
        return (menu[index] = {
          ...menu[index],
          expanded: !menu[index].expanded,
        });
      }
      return m;
    });
    setMenu(newMenu);
  };

  return (
    <div className="flex grow flex-col overflow-y-auto bg-gradient-to-r from-[#00B8F21A] to-[#00B8F200] pb-4 border-r w-[320px] scrollbar-thin">
      <div className="flex mx-5 shrink-0 items-center mt-[23px] mb-[24px] relative z-1">
        <MainLogoIcon />
        <div className="absolute bottom-[-38px] right-0 z-10 p-[7px] rounded-full bg-[#533C78]">
          <ToggleIcon />
        </div>
      </div>
      <nav className="flex flex-1 flex-col mx-5  mt-[31px] h-full relative gap-6">
        <UserInfo />
        <div
          className={classNames("h-full gap-6", {
            // "blur-md": lockSidebar,
          })}
        >
          {menu?.map(
            ({ href, label, name, icon, expanded, children }, index) => (
              <Fragment key={`parent-tab-${name}`}>
                <SidebarItem
                  href={href}
                  handleExpandClick={handleExpandClick}
                  name={name}
                  icon={icon}
                  children={children}
                  label={label}
                  expanded={expanded}
                  index={index}
                  isActive={name === activeTab || isChildActive(children)}
                />

                {expanded &&
                  children?.map(({ href, label, name, icon }) => (
                    <SidebarItem
                      key={`child-tab-${name}`}
                      href={href}
                      label={label}
                      name={name}
                      icon={icon}
                      isActive={name === activeTab}
                      isChild
                    />
                  ))}
              </Fragment>
            )
          )}
        </div>
        {/* {lockSidebar && (
          <div className="flex flex-col z-70 p-6 items-center text-center gap-10px absolute top-1/3">
            <LockIconV2 color={"var(--primary-color)"} />
            <div>The Feature will be unlocked once the school is setup.</div>
            <div className="flex items-center flex-nowrap w-full gap-3">
              <div className="min-h-3 bg-primary w-full rounded-md"></div>
              <span>100%</span>
            </div>
          </div>
        )} */}
      </nav>
    </div>
  );
};

export default Sidebar;

const UserInfo = () => {
  const userInfo = useSelector(getCurrentUserInfo);
  return (
    <div className="flex items-center space-x-4 p-3 border rounded-[10px] shadow-sm bg-white max-w-sm ">
      <div className="w-[40px] h-[40px]  rounded-full flex items-center justify-center">
        <UserIcon2 />
      </div>

      <div>
        <h2 className="text-lg text-[16px] leading-[28px] font-medium text-600">
          {userInfo?.name ?? "Anonymous"}
        </h2>
        <p className="text-[16px] leading-[20px] text-400">
          {getRoleName(userInfo?.role)}
        </p>
      </div>
    </div>
  );
};

const SidebarItem = ({
  href,
  handleExpandClick,
  icon: Icon,
  children,
  label,
  expanded,
  index,
  isActive,
  className,
  isChild,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={classNames(
        "flex w-full h-[50px] relative select-none",
        { "pl-14": isChild, "gap-7": !isChild },
        className
      )}
      onClick={() => (children ? handleExpandClick(index) : navigate(href))}
    >
      {/* {!isChild && (
        <div
          className={classNames("min-w-2 rounded-r-md", {
            "!bg-primary": isActive,
            "bg-white": !isActive,
          })}
        />
      )} */}
      <div
        className={classNames(
          "group flex gap-x-3 rounded-[8px] px-3 py-[10px] font-semibold cursor-pointer w-full items-center text-16px leading-6",
          {
            "bg-primary text-white": isActive && !isChild,
            "text-gray-700 hover:bg-gray-50": !isActive,
            "text-primary": isActive && isChild,
          }
        )}
      >
        {Icon !== undefined && (
          <Icon
            className={classNames("shrink-0", {
              "#FFFFFF": isActive && !isChild,
              "text-gray-400 group-hover:text-primary": !isActive,
            })}
            color={isActive ? (isChild ? "#0C8CE9" : "#FFFFFF") : undefined}
            aria-hidden="true"
          />
        )}

        {label}
      </div>

      {children && (
        <ArrowDownIcon
          className={classNames(
            "absolute right-2 top-0 bottom-0 my-auto transition-transform",
            {
              "rotate-180": expanded,
            }
          )}
          color={isActive ? "#FFFFFF" : undefined}
        />
      )}
    </div>
  );
};
