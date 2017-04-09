import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_TIMELINE } from './constants';
import { requestTimelineSucceeded, requestTimelineFailed } from './actions';

export function fetchTimelineFromServer() {
  return fetch('http://localhost:3000/api/timeline')
    .then((response) => response.json());
}

export function* fetchTimeline() {
  try {
    const timeline = yield call(fetchTimelineFromServer);
    yield put(requestTimelineSucceeded(timeline));
  } catch (error) {
    yield put(requestTimelineFailed(error));
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
