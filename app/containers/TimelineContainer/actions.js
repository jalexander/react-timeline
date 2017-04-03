/*
 *
 * TimelineContainer actions
 *
 */

import {
  REQUEST_TIMELINE,
  REQUEST_TIMELINE_SUCCEEDED,
  REQUEST_TIMELINE_FAILED,
} from './constants';

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
