import React, { Component } from 'react';
import Task from './Task.jsx';

class Lane extends Component {

  render() {
    return (
      <div className='flex flex-col'>
        <Task />
      </div>
    );
  }
}

export default Lane;