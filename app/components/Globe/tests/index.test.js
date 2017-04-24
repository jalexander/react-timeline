import React from 'react';
import { shallow } from 'enzyme';

import Globe from '../index';

describe('<Globe />', () => {
  let setActiveMarkerSpy;

  beforeEach(() => {
    setActiveMarkerSpy = jest.fn();
  });

  it('should render a style prop', () => {
    const renderedComponent = shallow(<Globe
      setActiveMarker={setActiveMarkerSpy}
    />);
    expect(renderedComponent.prop('style')).toEqual({});
  });
});
