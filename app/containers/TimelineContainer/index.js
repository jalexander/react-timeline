/*
 *
 * TimelineContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectTimelineContainer from './selectors';
import { requestTimeline, setActiveMarker } from './actions';

import Globe from '../../components/Globe';

export class TimelineContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    requestTimeline: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.requestTimeline();
  }

  render() {
    const { timeline, activeMarkerId } = this.props.TimelineContainer;
    return (
      <div>
        {
          !!timeline &&
          timeline.length &&
          <Globe
            setActiveMarker={this.props.setActiveMarker}
            {...{ activeMarkerId, timeline }}
          />
        }
      </div>
    );
  }
}

TimelineContainer.propTypes = {
  requestTimeline: PropTypes.func.isRequired,
  setActiveMarker: PropTypes.func.isRequired,
  TimelineContainer: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  TimelineContainer: makeSelectTimelineContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestTimeline: () => dispatch(requestTimeline()),
    setActiveMarker: (id) => dispatch(setActiveMarker(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
