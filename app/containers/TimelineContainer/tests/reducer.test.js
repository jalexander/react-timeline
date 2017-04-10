import { fromJS } from 'immutable';

import timelineContainerReducer from '../reducer';
import {
  setActiveMarker,
} from '../actions';

describe('timelineContainerReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      timeline: [],
      activeMarkerId: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(timelineContainerReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the setActiveMarker action correctly', () => {
    const fixture = 'testId';
    const expectedResult = state.set('activeMarkerId', fixture);

    expect(timelineContainerReducer(state, setActiveMarker(fixture))).toEqual(expectedResult);
  });
});
