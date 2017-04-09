/*
 *
 * TimelineContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUEST_TIMELINE_SUCCEEDED,
  SET_ACTIVE_MARKER,
} from './constants';

const initialState = fromJS({
  timeline: [],
  activeMarker: null,
});

function timelineContainerReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TIMELINE_SUCCEEDED:
      return state
        .set('timeline', action.timeline)
        .set('activeMarkerId', action.timeline[0].id);
    case SET_ACTIVE_MARKER:
      return state.set('activeMarkerId', action.id);
    default:
      return state;
  }
}

export default timelineContainerReducer;
