import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import { connect } from 'react-redux';

class Project extends Component {
  render() {
    return (
      <div>
        <LoggedInHeader />
        <h1>Individual Project View</h1>
      </div>
    );
  }
}

export default connect(null)(Project);