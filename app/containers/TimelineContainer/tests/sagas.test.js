/**
 * Test  sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { REQUEST_TIMELINE } from '../constants';
import { requestTimelineSucceeded, requestTimelineFailed } from '../actions';

import { fetchTimelineSaga, fetchTimeline } from '../sagas';

/* eslint-disable redux-saga/yield-effects */
describe('fetchTimeline Saga', () => {
  let fetchTimelineGenerator;

  beforeEach(() => {
    fetchTimelineGenerator = fetchTimeline();

    const callDescriptor = fetchTimelineGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the requestTimelineSucceeded action if it requests the data successfully', () => {
    const response = [{
      name: 'First repo',
    }, {
      name: 'Second repo',
    }];
    const putDescriptor = fetchTimelineGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(requestTimelineSucceeded(response)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = fetchTimelineGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(requestTimelineFailed(response)));
  });
});

describe('fetchTimelineSaga Saga', () => {
  const fetchTimelineSagaGenerator = fetchTimelineSaga();

  it('should start task to watch for REQUEST_TIMELINE action', () => {
    const takeLatestDescriptor = fetchTimelineSagaGenerator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(REQUEST_TIMELINE, fetchTimeline));
  });
});
