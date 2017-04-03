import { createSelector } from 'reselect';

/**
 * Direct selector to the timelineContainer state domain
 */
const selectTimelineContainerDomain = () => (state) => state.get('timelineContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TimelineContainer
 */

const makeSelectTimelineContainer = () => createSelector(
  selectTimelineContainerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTimelineContainer;
export {
  selectTimelineContainerDomain,
};
