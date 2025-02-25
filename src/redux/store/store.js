import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import createSagaMiddleware from "redux-saga";
import appReducer from "../reducers/appReducer";
import { userInfoReducer } from "../reducers/userInfoReducer";
import { userRoleAccessReducer } from "../reducers/userRoleAccessReducer";
import { userSaga } from "../sagas/appSaga";
import { history } from "./history";

const { createReduxHistory, routerReducer, routerMiddleware } =
  createReduxHistoryContext({
    history: history,
  });

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  router: routerReducer,
  app: appReducer,
  userInfo: userInfoReducer,
  roleAccess: userRoleAccessReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return reducers(undefined, action);
  }

  return reducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware, sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(userSaga);

export const reduxHistory = createReduxHistory(store);
export default store;
