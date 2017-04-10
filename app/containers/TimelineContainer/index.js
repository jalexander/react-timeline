/*
 *
 * TimelineContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTimeline, makeSelectActiveMarkerId } from './selectors';
import { requestTimeline, setActiveMarker } from './actions';
import { Iterable } from 'immutable'

import Globe from '../../components/Globe';

export class TimelineContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    requestTimeline: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.requestTimeline();
  }

  render() {
    const { timeline, activeMarkerId } = this.props;
    return (
      <div>
        {
          !!timeline &&
          timeline.size > 0 &&
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
  timeline: PropTypes.instanceOf(Iterable),
  activeMarkerId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTimeline(),
  activeMarkerId: makeSelectActiveMarkerId(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestTimeline: () => dispatch(requestTimeline()),
    setActiveMarker: (id) => dispatch(setActiveMarker(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
