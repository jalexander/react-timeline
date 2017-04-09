import React from 'react';
import { shallow } from 'enzyme';

import Globe from '../index';

describe('<Globe />', () => {
  it('should render a style prop', () => {
    const renderedComponent = shallow(<Globe />);
    expect(renderedComponent.prop('style')).toEqual({});
  });
});
