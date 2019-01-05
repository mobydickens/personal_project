import React, { Component } from 'react';

class ProgressBar extends Component {
  render() {
    let {timeSpent, remaining, currentEstimate } = this.props;
    let percent = remaining===0 ? 100 : (timeSpent / currentEstimate) * 100;
    return (
      <div>
        <div className="progress gradient">
          <span style={{width:`${percent}%`, transition: '1s linear' }} className="span-progress text-center text-xs p-2">{`${percent.toFixed()}%`}</span>
        </div>
      </div>
    );
  }
}

export default ProgressBar;