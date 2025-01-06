import { all, call, fork, put, take, takeLatest } from "redux-saga/effects";
import { getUserInfo as getUserInfoApiReq } from "src/tabs/auth/api-client";
import {
  INITIALIZE,
  setInitialized,
  USER_INFO_REQUEST_SUCCEED,
  userInfoRequest,
  userInfoRequestFailed,
  userInfoRequestSucceed,
} from "../actions/app";

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
