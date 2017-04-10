/**
 * TimelineContainer selectors
 */

import { createSelector } from 'reselect';

const selectTimelineContainer = (state) => state.get('timelineContainer');

const makeSelectTimeline = () => createSelector(
  selectTimelineContainer,
  (timelineContainerState) => timelineContainerState.get('timeline')
);

const makeSelectActiveMarkerId = () => createSelector(
  selectTimelineContainer,
  (timelineContainerState) => timelineContainerState.get('activeMarkerId')
);

export {
  selectTimelineContainer,
  makeSelectTimeline,
  makeSelectActiveMarkerId,
};
