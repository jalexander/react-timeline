/**
*
* Carousel
*
*/

import React, { PropTypes } from 'react';
import { Iterable } from 'immutable';
import styled from 'styled-components';

const Wrapper = styled.div`
  top: 0;
  left: 0;

  display: block;
`;


class Carousel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
      </Wrapper>
    );
  }
}

Carousel.propTypes = {
  setActiveMarker: PropTypes.func.isRequired,

  activeMarkerId: PropTypes.string,
  previewMarkerData: PropTypes.object,
  setPreviewMarker: PropTypes.func,
  timeline: PropTypes.instanceOf(Iterable),
};

export default Carousel;
