import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader';

class ProjectEdit extends Component {
  render() {
    return (
      <div>
        <LoggedInHeader />
        <div className='m-6'>
          <div>Start a project</div>
        </div>
      </div>
    );
  }
}

export default ProjectEdit;