/*
 *
 * TimelineContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Iterable } from 'immutable';
import { makeSelectTimeline, makeSelectActiveMarkerId, makeSelectPreviewMarkerData } from './selectors';
import { requestTimeline, setActiveMarker, setPreviewMarker } from './actions';

import Globe from '../../components/Globe';
import Tooltip from '../../components/Tooltip';

export class TimelineContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    requestTimeline: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.requestTimeline();
  }

  render() {
    const { activeMarkerId, previewMarkerData, timeline } = this.props;
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
  timeline: PropTypes.instanceOf(Iterable),

  activeMarkerId: PropTypes.string,
  previewMarkerData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTimeline(),
  activeMarkerId: makeSelectActiveMarkerId(),
  previewMarkerData: makeSelectPreviewMarkerData(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestTimeline: () => dispatch(requestTimeline()),
    setActiveMarker: (id) => dispatch(setActiveMarker(id)),
    setPreviewMarker: (id) => dispatch(setPreviewMarker(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
