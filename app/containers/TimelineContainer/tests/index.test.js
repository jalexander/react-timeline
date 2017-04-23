import React from 'react';
import { shallow, mount } from 'enzyme';

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

  it('should render a div', () => {
    const renderedComponent = shallow(
      <TimelineContainer
        requestTimeline={requestTimelineSpy}
        setActiveMarker={setActiveMarkerSpy}
        setPreviewMarker={setPreviewMarkerSpy}
      />
    );
    expect(renderedComponent.contains(<div />)).toEqual(true);
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
