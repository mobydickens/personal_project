import React, { Component } from 'react';
import { connect } from 'react-redux';

class OnTrack extends Component {
  render() {
    let { onTrackInfo } = this.props;
    let onTrack = onTrackInfo[0];
    
    return (
      <div>
        { !onTrack ? "" : onTrack.remaining_expected < onTrack.remaining_actual  
        ?
          <div className="text-center py-4 lg:px-4 mt-8">
            <div className="p-2 bg-red-dark items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <span className="flex rounded-full bg-red-lighter uppercase px-4 py-2 text-xs font-bold mr-3">Uh-Oh!</span>
              <span className="font-semibold mr-2 text-left flex-auto">Looks like you are a bit behind. Make sure to log those hours!</span>
            </div>
          </div>
        : onTrack.remaining_expected >= onTrack.remaining_actual 
        ? 
          <div className="text-center py-4 lg:px-4 mt-8">
            <div className="p-2 bg-palette-blue items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <span className="flex rounded-full bg-blue-darkest uppercase px-4 py-2 text-xs font-bold mr-3">Excellent!</span>
              <span className="font-semibold mr-2 text-left flex-auto">Keep up the good work; you are on schedule!</span>
            </div>
          </div>
        : ""
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