import React from 'react';
import { mount } from 'enzyme';

import { TimelineContainer } from '../index';

describe('<TimelineContainer />', () => {
  let requestTimelineSpy;
  let setActiveMarkerSpy;
  let setPreviewMarkerSpy;

  beforeEach(() => {
    requestTimelineSpy = jest.fn();
    setActiveMarkerSpy = jest.fn();
    setPreviewMarkerSpy = jest.fn();
  });

  it('should request timeline data on mount', () => {
    mount(
      <TimelineContainer
        requestTimeline={requestTimelineSpy}
        setActiveMarker={setActiveMarkerSpy}
        setPreviewMarker={setPreviewMarkerSpy}
      />
    );
    expect(requestTimelineSpy).toHaveBeenCalled();
  });
});
