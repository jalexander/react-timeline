/*
 *
 * TimelineContainer actions
 *
 */

import {
  REQUEST_TIMELINE,
  REQUEST_TIMELINE_SUCCEEDED,
  REQUEST_TIMELINE_FAILED,
  SET_ACTIVE_MARKER,
  SET_PREVIEW_MARKER,
  SET_STAGE_DIMENSIONS,
} from './constants';

import getStageDimensions from '../../utils/getStageDimensions'

export function requestTimeline() {
  return {
    type: REQUEST_TIMELINE,
  };
}

export function requestTimelineSucceeded(timeline) {
  return {
    type: REQUEST_TIMELINE_SUCCEEDED,
    timeline,
  };
}

export function requestTimelineFailed(message) {
  return {
    type: REQUEST_TIMELINE_FAILED,
    message,
  };
}

export function setActiveMarker(id) {
  return {
    type: SET_ACTIVE_MARKER,
    id,
  };
}

export function setPreviewMarker(data) {
  return {
    type: SET_PREVIEW_MARKER,
    data,
  };
}

export function setStageDimensions() {
  return {
    type: SET_STAGE_DIMENSIONS,
    stage: getStageDimensions(),
  }
}
