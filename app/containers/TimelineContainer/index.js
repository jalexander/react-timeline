/*
 *
 * TimelineContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Iterable } from 'immutable';
import { debounce } from 'lodash';
import { makeSelectTimeline, makeSelectActiveMarkerId, makeSelectPreviewMarkerData, makeSelectStage } from './selectors';
import { requestTimeline, setActiveMarker, setPreviewMarker, setStageDimensions } from './actions';

import Globe from '../../components/Globe';
import Carousel from '../../components/Carousel';
import Tooltip from '../../components/Tooltip';

export class TimelineContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    requestTimeline: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.requestTimeline();
    window.addEventListener('resize', this.resizeDebounce);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeDebounce);
  }

  resize = () => { this.props.setStageDimensions(); }

  resizeDebounce = debounce(this.resize, 250)

  render() {
    const { activeMarkerId, previewMarkerData, timeline, stage } = this.props;
    let previewMarker;
    if (previewMarkerData) previewMarker = timeline.find((item) => item.get('id') === previewMarkerData.get('id'));
    return (
      <div>
        {
          !!timeline &&
          timeline.size > 0 &&
          <Globe
            setActiveMarker={this.props.setActiveMarker}
            setPreviewMarker={this.props.setPreviewMarker}
            {...{
              activeMarkerId,
              previewMarkerData,
              timeline,
              stage,
            }}
          />
        }
        {
          !!timeline &&
          timeline.size > 0 &&
          <Carousel
            setActiveMarker={this.props.setActiveMarker}
            setPreviewMarker={this.props.setPreviewMarker}
            {...{
              activeMarkerId,
              previewMarkerData,
              timeline,
              stage,
            }}
          />
        }
        <Tooltip {...{ previewMarker, previewMarkerData }} />
      </div>
    );
  }
}

TimelineContainer.propTypes = {
  requestTimeline: PropTypes.func.isRequired,
  setActiveMarker: PropTypes.func.isRequired,
  setPreviewMarker: PropTypes.func.isRequired,
  setStageDimensions: PropTypes.func.isRequired,
  timeline: PropTypes.instanceOf(Iterable),

  activeMarkerId: PropTypes.string,
  previewMarkerData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTimeline(),
  activeMarkerId: makeSelectActiveMarkerId(),
  previewMarkerData: makeSelectPreviewMarkerData(),
  stage: makeSelectStage(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestTimeline: () => dispatch(requestTimeline()),
    setActiveMarker: (id) => dispatch(setActiveMarker(id)),
    setPreviewMarker: (id) => dispatch(setPreviewMarker(id)),
    setStageDimensions: () => dispatch(setStageDimensions()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
