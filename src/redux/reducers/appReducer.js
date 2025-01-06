import { SET_ACTIVE_TAB, SET_INITIALIZED } from "../actions/app";

const initialState = {
  message: "hello",
  activeTab: undefined,
  isInitialized: false,
};

const appReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case "HELLO_WORLD":
      return {
        ...state,
        message: "hello world",
      };
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: payload.payload,
      };

    case SET_INITIALIZED:
      return {
        ...state,
        isInitialized: payload.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
