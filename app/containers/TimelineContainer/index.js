/*
 *
 * TimelineContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectTimelineContainer from './selectors';
import { requestTimeline } from './actions';

export class TimelineContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    requestTimeline: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.requestTimeline();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

TimelineContainer.propTypes = {
  requestTimeline: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  TimelineContainer: makeSelectTimelineContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestTimeline: () => dispatch(requestTimeline()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
