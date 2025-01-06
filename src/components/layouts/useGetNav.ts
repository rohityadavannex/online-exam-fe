import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  getAdminNavTabs,
  siteAdminNavOptions,
  superAdminNavOptions,
} from "src/apps/common/menu-navigation/menuNavigation";
import { checkViewAccess, getUserRole } from "src/redux/selectors/app";

const useGetNav = () => {
  const userRole = useSelector(getUserRole);
  const hasViewAccessToTab = useSelector((state) => checkViewAccess(state));

  const navigationTabs = useMemo(() => {
    if (userRole === 1) {
      return siteAdminNavOptions;
    }
    if (userRole === 2) {
      return superAdminNavOptions;
    }

    return getAdminNavTabs(hasViewAccessToTab);
  }, [userRole, hasViewAccessToTab]);

  return { navigationTabs };
};

export default useGetNav;
