import React, { Component } from 'react';
import { connect } from 'react-redux';

class OnTrack extends Component {
  render() {
    // threshhold gives a little leeway before changing warnings/notifications
    const threshholdHours = 3;
    let { onTrackInfo } = this.props;
    return (
      <div>
        { !onTrackInfo 
          ? 
            //for the case when it is a new project, and no timelogs have yet been created
            <div className="text-center py-4 lg:px-4 mt-8">
              <div className="p-2 bg-red-dark items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span className="flex rounded-full bg-smoke uppercase px-4 py-2 text-xs font-bold mr-3">No data!</span>
                <span className="font-semibold mr-2 text-left flex-auto">Start logging time in tasks to see your graphs update.</span>
              </div>
            </div>
          : onTrackInfo.remaining_expected < onTrackInfo.remaining_actual - threshholdHours
          ?
            <div className="text-center py-4 lg:px-4 mt-8">
              <div className="p-2 bg-red-dark items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span className="flex rounded-full bg-red-lighter uppercase px-4 py-2 text-xs font-bold mr-3">Uh-Oh!</span>
                <span className="font-semibold mr-2 text-left flex-auto">Looks like you are a bit behind. Make sure to log those hours!</span>
              </div>
            </div>
          : onTrackInfo.remaining_expected > onTrackInfo.remaining_actual + threshholdHours
          ?
            <div className="text-center py-4 lg:px-4 mt-8">
              <div className="p-2 bg-palette-blue items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span className="flex rounded-full bg-blue-darkest uppercase px-4 py-2 text-xs font-bold mr-3">Excellent!</span>
                <span className="font-semibold mr-2 text-left flex-auto">You are ahead of schedule!</span>
              </div>
            </div>
          : 
            <div className="text-center py-4 lg:px-4 mt-8">
              <div className="p-2 bg-green-darker items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span className="flex rounded-full bg-green uppercase px-4 py-2 text-xs font-bold mr-3">Nice job!</span>
                <span className="font-semibold mr-2 text-left flex-auto">You are right on track!</span>
              </div>
            </div>
        }
      </div>
    );
  }
}

function mapState(state) {
  return {
    onTrackInfo: state.onTrackInfo
  }
}
export default connect(mapState)(OnTrack);