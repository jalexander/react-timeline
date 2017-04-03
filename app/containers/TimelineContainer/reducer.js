/*
 *
 * TimelineContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUEST_TIMELINE_SUCCEEDED,
} from './constants';

const initialState = fromJS({
  timeline: [],
});

function timelineContainerReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TIMELINE_SUCCEEDED:
      return state.set('timeline', action.timeline);
    default:
      return state;
  }
}

export default timelineContainerReducer;
