import React, { Component } from 'react';

class Lane extends Component {

  render() {
    return (
      <div className='flex flex-col'>
        <p className='p-2 bg-grey-light'>Task</p>
        <p className='p-2 bg-grey-light'>Task</p>
        <p className='p-2 bg-grey-light'>Task</p>
        <p className='p-2 bg-grey-light'>Task</p>
      </div>
    );
  }
}

export default Lane;