import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  collageNavOptions,
  examinerNavOptions,
  siteAdminNavOptions,
  universityNavOptions,
} from "src/apps/common/menu-navigation/menuNavigation";
import { checkViewAccess, getUserRole } from "src/redux/selectors/app";
import { ROLES } from "src/utils/constants";

const useGetNav = () => {
  const userRole = useSelector(getUserRole);
  const hasViewAccessToTab = useSelector((state) => checkViewAccess(state));

  const navigationTabs = useMemo(() => {
    if (userRole === ROLES.SITE_ADMIN) {
      return siteAdminNavOptions;
    }
    // if (userRole === ROLES.UNIVERSITY) {
    //   return universityNavOptions;
    // }

    if (userRole === ROLES.COLLEGE) {
      return collageNavOptions;
    }

    if (userRole === ROLES.EXAMINER) {
      return examinerNavOptions;
    }

    console.log("line 32 -------------------> ", userRole);

    return universityNavOptions.filter((item) => {
      return hasViewAccessToTab(item.name);
    });

    //return getAdminNavTabs(hasViewAccessToTab);
  }, [hasViewAccessToTab, userRole]);

  return { navigationTabs };
};

export default useGetNav;
