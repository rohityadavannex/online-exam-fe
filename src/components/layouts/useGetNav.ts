import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  collageNavOptions,
  getAdminNavTabs,
  siteAdminNavOptions,
  universityNavOptions,
} from "src/apps/common/menu-navigation/menuNavigation";
import { ROLES } from "src/helpers/helpers";
import { checkViewAccess, getUserRole } from "src/redux/selectors/app";

const useGetNav = () => {
  const userRole = useSelector(getUserRole);
  const hasViewAccessToTab = useSelector((state) => checkViewAccess(state));

  const navigationTabs = useMemo(() => {
    if (userRole === ROLES.SITE_ADMIN) {
      return siteAdminNavOptions;
    }
    if (userRole === ROLES.UNIVERSITY) {
      return universityNavOptions;
    }

    if (userRole === ROLES.COLLAGE) {
      return collageNavOptions;
    }

    return getAdminNavTabs(hasViewAccessToTab);
  }, [userRole, hasViewAccessToTab]);

  return { navigationTabs };
};

export default useGetNav;
