export const HELLO_WORLD = "HELLO_WORLD";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export const INITIALIZE = "INITIALIZE";

export const SET_INITIALIZED = "SET_INITIALIZED";

export const helloWorld = (payload) => ({ type: HELLO_WORLD, payload });
export const setActiveTab = (payload) => ({ type: SET_ACTIVE_TAB, payload });

export const initialize = () => ({ type: INITIALIZE });
export const setInitialized = (payload) => ({ type: SET_INITIALIZED, payload });

//USER INFO ACTIONS
export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_REQUEST_SUCCEED = "USER_INFO_REQUEST_SUCCEED";
export const USER_INFO_REQUEST_FAILED = "USER_INFO_REQUEST_FAILED";

export const userInfoRequest = () => ({ type: USER_INFO_REQUEST });
export const userInfoRequestSucceed = (payload) => ({
  type: USER_INFO_REQUEST_SUCCEED,
  payload,
});
export const userInfoRequestFailed = (payload) => ({
  type: USER_INFO_REQUEST_FAILED,
  payload,
});

//USER INFO ACTIONS
export const USER_ROLE_ACCESS_REQUEST = "USER_ROLE_ACCESS_REQUEST";
export const USER_ROLE_ACCESS_REQUEST_SUCCEED =
  "USER_ROLE_ACCESS_REQUEST_SUCCEED";
export const USER_ROLE_ACCESS_REQUEST_FAILED =
  "USER_ROLE_ACCESS_REQUEST_FAILED";

export const userRoleAccessRequest = () => ({ type: USER_ROLE_ACCESS_REQUEST });
export const userRoleAccessRequestSucceed = (payload) => ({
  type: USER_ROLE_ACCESS_REQUEST_SUCCEED,
  payload,
});
export const userRoleAccessRequestFailed = (payload) => ({
  type: USER_ROLE_ACCESS_REQUEST_FAILED,
  payload,
});
