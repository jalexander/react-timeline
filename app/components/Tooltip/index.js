/**
*
* Tooltip
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  left: ${(props) => `${props.x}px` || 0};
  top: ${(props) => `${props.y}px` || 0};
  position: absolute;
  z-index: 5;

  display: block;

  box-sizing: border-box;
  padding: 10px;

  transition: 0.5s opacity ease;
  text-align: center;
  text-transform: uppercase;

  opacity: ${(props) => props.x ? '0.9' : '0'};
  background: rgba(70, 70, 70, 0.9);

  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  transform: ${(props) => props.x ? 'translateX(-50%) translateY(-125%)' : 'translateX(-50%) translateY(-130%)'};
  pointer-events: none;

  &:after {
    position: absolute;
    top: 100%;
    left: 50%;

    width: 0;
    height: 0;
    margin-left: -10px;

    content: " ";
    pointer-events: none;

    opacity: 0.9;
    border: solid transparent;
    border-width: 10px;
    border-color: rgba(145, 52, 10, 0);
    border-top-color: #464646;
  }
`;

const Title = styled.p`
  white-space: nowrap;
  color: white;
  margin: 0;
`;

const Date = styled(Title)`
  opacity: 0.4;
`;

class Tooltip extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { previewMarker, previewMarkerData } = this.props;
    let x;
    let y;

    if (previewMarkerData) {
      x = previewMarkerData.get('x');
      y = previewMarkerData.get('y');
    }

    return (
      <Wrapper {...{ x, y }}>
        <Date>{previewMarker && previewMarker.get('title')}</Date>
        <Title>{previewMarker && previewMarker.get('year')}</Title>
      </Wrapper>
    );
  }
}

Tooltip.propTypes = {
  previewMarker: PropTypes.object,
  previewMarkerData: PropTypes.object,
};

export default Tooltip;
