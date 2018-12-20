import React, { Component } from 'react';

class DetailModal extends Component {
  render() {
    return (
      <div className='fixed pin-r pin-t w-full h-screen'>
        <div className='flex absolute pin-x pin-t bg-grey p-6'>
          <div className='bg-yellow w-full'>Testing</div>
          <div className='bg-blue w-full'>Testing</div>
        </div>
      </div>
    );
  }
}

export default DetailModal;