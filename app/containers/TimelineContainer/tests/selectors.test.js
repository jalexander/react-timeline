import { fromJS } from 'immutable';

import {
  selectTimelineContainer,
  makeSelectTimeline,
  makeSelectActiveMarkerId,
  makeSelectPreviewMarkerData,
} from '../selectors';

describe('selectTimelineContainer', () => {
  it('should select the timelineContainer state', () => {
    const timelineContainerState = fromJS({
      timeline: [],
      activeMarker: null,
    });
    const mockedState = fromJS({
      timelineContainer: timelineContainerState,
    });
    expect(selectTimelineContainer(mockedState)).toEqual(timelineContainerState);
  });
});

describe('makeSelectTimeline', () => {
  const timelineSelector = makeSelectTimeline();
  it('should select the timeline', () => {
    const timeline = fromJS([]);
    const mockedState = fromJS({
      timelineContainer: {
        timeline,
      },
    });
    expect(timelineSelector(mockedState)).toEqual(timeline);
  });
});

describe('makeSelectActiveMarkerId', () => {
  const activeMarkerIdSelector = makeSelectActiveMarkerId();
  it('should select the activeMarkerId', () => {
    const activeMarkerId = 'testId';
    const mockedState = fromJS({
      timelineContainer: {
        activeMarkerId,
      },
    });
    expect(activeMarkerIdSelector(mockedState)).toEqual(activeMarkerId);
  });
});

describe('makeSelectPreviewMarkerData', () => {
  const previewMarkerDataSelector = makeSelectPreviewMarkerData();
  it('should select the previewMarkerData', () => {
    const previewMarkerData = {};
    const mockedState = fromJS({
      timelineContainer: {
        previewMarkerData,
      },
    });
    expect(previewMarkerDataSelector(mockedState)).toEqual(previewMarkerData);
  });
});
