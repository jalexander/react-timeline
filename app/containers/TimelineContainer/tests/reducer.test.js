
import { fromJS } from 'immutable';
import timelineContainerReducer from '../reducer';

describe('timelineContainerReducer', () => {
  it('returns the initial state', () => {
    expect(timelineContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
