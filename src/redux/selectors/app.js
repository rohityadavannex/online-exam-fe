import { ROLES } from "src/utils/constants";

export const getActiveTab = (state) => state.app.activeTab;

export const isUserInfoInProgress = (state) =>
  state.userInfo?.inProgress ?? false;
export const getCurrentUserInfo = (state) => state.userInfo?.data ?? {};

export const getUserRole = (state) => state.userInfo.data?.role ?? 3;

export const isUserRoleAccessInProgress = (state) =>
  state.roleAccess?.inProgress ?? false;
export const getRoleAccess = (state) => state?.roleAccess?.data ?? {};
export const getPlanAccess = (state) => state?.userPlan?.data?.planAccess ?? [];

//ACCess selectors
export const hasFeatureAccess = (state, tabName) => {
  const activeTab = tabName ?? getActiveTab(state);
  const roleAccess = getRoleAccess(state);
  const permissions = Object.keys(roleAccess?.permissions ?? {})?.find(
    (item) => {
      return item === activeTab;
    }
  );

  if (!permissions) {
    return [];
  }

  return roleAccess.permissions[activeTab];
};

//ACCess selectors
export const hasPlanAccess = (state, tabName) => {
  const activeTab = tabName ?? getActiveTab(state);
  const roleAccess = getPlanAccess(state);

  const permissions = roleAccess?.find((item) => {
    return item.name === activeTab;
  });

  return !!permissions;
};

export const hasViewAccess = (state, tabName) => {
  const userRole = getUserRole(state);
  // for super admin
  if (userRole === 1) {
    return true;
  }
  if (
    // !hasPlanAccess(state, tabName) ||
    !hasFeatureAccess(state, tabName)?.includes("read")
  ) {
    return false;
  }
  return true;
};

export const hasEditAccess = (state, tabName) => {
  const userRole = getUserRole(state);
  // for super admin
  if (userRole === 1) {
    return true;
  }
  if (
    // !hasPlanAccess(state, tabName) ||
    !hasFeatureAccess(state, tabName)?.includes("write")
  ) {
    return false;
  }
  return true;
};

export const hasDeleteAccess = (state, tabName) => {
  const userRole = getUserRole(state);
  // for super admin
  if (userRole === 1) {
    return true;
  }
  if (
    // !hasPlanAccess(state, tabName) ||
    !hasFeatureAccess(state, tabName)?.includes("read")
  ) {
    return false;
  }
  return true;
};

export const checkViewAccess = (state) => {
  return (tabName) => hasViewAccess(state, tabName);
};

//user plan selectors
export const isGetUserPlanInProgress = (state) =>
  state?.userPlan?.inProgress ?? false;

export const getUserPlanData = (state) => state.userPlan.data ?? null;

export const isAppInitializing = (state) => {
  const isUserInProgress = isUserInfoInProgress(state);
  const isRoleAccessInProgress = isUserRoleAccessInProgress(state);
  const isUserPlanInProgress = isGetUserPlanInProgress(state);

  return isUserInProgress || isRoleAccessInProgress || isUserPlanInProgress;
};

export const isAppInitialized = (state) => state.app.isInitialized;

export const isSuperAdmin = (state) => getUserRole(state) === ROLES.SUPER_ADMIN;
