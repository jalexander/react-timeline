// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { REQUEST_TIMELINE } from './constants';
import { requestTimelineSucceeded, requestTimelineFailed } from './actions';

export function fetchTimelineFromServer() {
  return fetch('http://localhost:3000/api/timeline')
    .then((response) => response.json());
}

function* fetchTimeline() {
  try {
    const timeline = yield call(fetchTimelineFromServer);
    yield put(requestTimelineSucceeded(timeline));
  } catch (e) {
    yield put(requestTimelineFailed(e.message));
  }
}

// Individual exports for testing
export function* fetchTimelineSaga() {
  yield takeLatest(REQUEST_TIMELINE, fetchTimeline);
}

// All sagas to be loaded
export default [
  fetchTimelineSaga,
];
