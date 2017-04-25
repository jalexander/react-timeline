/*
 *
 * TimelineContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUEST_TIMELINE_SUCCEEDED,
  SET_ACTIVE_MARKER,
  SET_PREVIEW_MARKER,
  SET_STAGE_DIMENSIONS,
} from './constants';

const initialState = fromJS({
  timeline: [],
  activeMarkerId: null,
  previewMarkerData: null,
  stage: null,
});

function timelineContainerReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TIMELINE_SUCCEEDED:
      return state
        .set('timeline', fromJS(action.timeline))
        .set('activeMarkerId', action.timeline[0].id);
    case SET_ACTIVE_MARKER:
      return state.set('activeMarkerId', action.id);
    case SET_PREVIEW_MARKER:
      return state.set('previewMarkerData', fromJS(action.data));
    case SET_STAGE_DIMENSIONS:
      return state.set('stage', fromJS(action.stage));
    default:
      return state;
  }
}

export default timelineContainerReducer;
