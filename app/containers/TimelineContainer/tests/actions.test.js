
import {
  requestTimeline,
  requestTimelineSucceeded,
  requestTimelineFailed,
  setActiveMarker,
} from '../actions';
import {
  REQUEST_TIMELINE,
  REQUEST_TIMELINE_SUCCEEDED,
  REQUEST_TIMELINE_FAILED,
  SET_ACTIVE_MARKER,
} from '../constants';

describe('TimelineContainer actions', () => {
  describe('requestTimeline', () => {
    it('has a type of REQUEST_TIMELINE', () => {
      const expected = {
        type: REQUEST_TIMELINE,
      };
      expect(requestTimeline()).toEqual(expected);
    });
  });

  describe('requestTimelineSucceeded', () => {
    it('should return the correct type and the passed array', () => {
      const fixture = [];
      const expected = {
        type: REQUEST_TIMELINE_SUCCEEDED,
        timeline: fixture,
      };
      expect(requestTimelineSucceeded(fixture)).toEqual(expected);
    });
  });

  describe('requestTimelineFailed', () => {
    it('should return the correct type and the passed message', () => {
      const fixture = 'error';
      const expected = {
        type: REQUEST_TIMELINE_FAILED,
        message: fixture,
      };
      expect(requestTimelineFailed(fixture)).toEqual(expected);
    });
  });

  describe('setActiveMarker', () => {
    it('should return the correct type and the passed id', () => {
      const fixture = 'test-id';
      const expected = {
        type: SET_ACTIVE_MARKER,
        id: fixture,
      };
      expect(setActiveMarker(fixture)).toEqual(expected);
    });
  });
});
