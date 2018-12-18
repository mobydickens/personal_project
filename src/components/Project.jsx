import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import { connect } from 'react-redux';
import Lane from './Lane.jsx';

class Project extends Component {
  render() {
    return (
      <div>
        <LoggedInHeader />
        <h3 className='m-6'>Individual Project View</h3>
        <div className='flex flex-col lg:flex-row m-6'>
          <Lane />
          <Lane />
          <Lane />
          <Lane />
        </div>
      </div>
    );
  }
}

export default connect(null)(Project);