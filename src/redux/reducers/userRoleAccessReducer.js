import {
  USER_ROLE_ACCESS_REQUEST,
  USER_ROLE_ACCESS_REQUEST_FAILED,
  USER_ROLE_ACCESS_REQUEST_SUCCEED,
} from "../actions/app";

const initialState = {
  inProgress: false,
  data: [],
};

export const userRoleAccessReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ROLE_ACCESS_REQUEST:
      return { ...state, inProgress: true, data: [] };
    case USER_ROLE_ACCESS_REQUEST_SUCCEED:
      return { ...state, inProgress: false, data: action.payload };
    case USER_ROLE_ACCESS_REQUEST_FAILED:
      return { ...state, inProgress: false, error: action.payload };
    default:
      return state;
  }
};
