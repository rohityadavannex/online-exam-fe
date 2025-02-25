import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";
import {
  getRoleAccess,
  getUserInfo as getUserInfoApiReq,
} from "src/tabs/auth/api-client";
import {
  INITIALIZE,
  setInitialized,
  USER_INFO_REQUEST_SUCCEED,
  userInfoRequest,
  userInfoRequestFailed,
  userInfoRequestSucceed,
  userRoleAccessRequest,
  userRoleAccessRequestFailed,
  userRoleAccessRequestSucceed,
} from "../actions/app";
import { getCurrentUserInfo } from "../selectors/app";

export function* userSaga() {
  yield all([
    takeLatest("HELLO_WORLD", handleHelloWorld),
    takeLatest(INITIALIZE, handleInitialization),
  ]);
}

function handleHelloWorld() {
  console.log("Hello World action - received");
}

function* handleInitialization() {
  //app will be initialized here
  yield fork(handleGetUserInfo);
  yield take(USER_INFO_REQUEST_SUCCEED);

  yield call(handleGetRoleAccess);
  yield put(setInitialized(true));
}

function* handleGetUserInfo() {
  try {
    yield put(userInfoRequest());
    const res = yield call(getUserInfoApiReq);
    yield put(userInfoRequestSucceed(res.data));
  } catch (err) {
    yield put(userInfoRequestFailed(err));
  }
}

function* handleGetRoleAccess() {
  try {
    const userInfo = yield select(getCurrentUserInfo);
    yield put(userRoleAccessRequest());
    const res = yield call(getRoleAccess, Number(userInfo?.role));
    yield put(userRoleAccessRequestSucceed(res.data));
  } catch (err) {
    yield put(userRoleAccessRequestFailed(err));
  }
}
