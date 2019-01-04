import React, { Component } from 'react';

class ProgressBar extends Component {
  render() {
    return (
      <div>
        <div className="progress animate gradient">
          <span className="span-progress"></span>
        </div>
      </div>
    );
  }
}

export default ProgressBar;