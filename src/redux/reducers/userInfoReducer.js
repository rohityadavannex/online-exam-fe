import {
  USER_INFO_REQUEST,
  USER_INFO_REQUEST_FAILED,
  USER_INFO_REQUEST_SUCCEED,
} from "../actions/app";

const initialState = {
  inProgress: false,
  data: [],
};

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { ...state, inProgress: true, data: [] };
    case USER_INFO_REQUEST_SUCCEED:
      return { ...state, inProgress: false, data: action.payload };
    case USER_INFO_REQUEST_FAILED:
      return { ...state, inProgress: false, error: action.payload };
    default:
      return state;
  }
};
