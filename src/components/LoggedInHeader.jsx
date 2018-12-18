import React, { Component } from 'react';

class LoggedInHeader extends Component {
  render() {
    return (
      <div className='flex justify-between'>
        <div className='text-2xl m-4 lg:text-3xl lg:m-6'>Name</div>
        <div className='flex invisible lg:visible'>
          <div>New Team</div>
          <div>New Project</div>
          <div>Logout</div>
        </div>
        <div><i className="fas fa-bars lg:invisible m-6 text-lg"></i></div>
      </div>
    );
  }
}

export default LoggedInHeader;