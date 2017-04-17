import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../index';
import TimelineContainer from '../../TimelineContainer';

describe('<HomePage />', () => {
  it('should render the timeline container', () => {
    const renderedComponent = shallow(
      <HomePage />
    );
    expect(renderedComponent.contains(
      <TimelineContainer />
    )).toEqual(true);
  });
});
