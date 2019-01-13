import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBackground } from '../ducks/reducer';

class BackgroundTernary extends Component {

  render() {
    const { background } = this.props;
    return (
      <div>
        {/* start of background ternary */}
        {background === 'Keyboard' 
          ? <div className='bg-main image-position h-screen z-0'></div> 
          : background === 'Puppers' 
          ? <div className='bg-puppers image-position h-screen z-0'></div>
          : background === 'White Brick'
          ? <div className='bg-whitebrick image-position h-screen z-0'></div> 
          : background === 'Desert'
          ? <div className='bg-desert image-position h-screen z-0'></div>
          : background === 'Coffee'
          ? <div className='bg-coffee image-position h-screen z-0'></div>
          : background === 'Field'
          ? <div className='bg-field image-position h-screen z-0'></div> 
          : background === 'Flight'
          ? <div className='bg-flight image-position h-screen z-0'></div>
          : background === 'Decay'
          ? <div className='bg-decay image-position h-screen z-0'></div>
          : background === 'Cityscape'
          ? <div className='bg-cityscape image-position h-screen z-0'></div>
          : background === 'Pier'
          ? <div className='bg-pier image-position h-screen z-0'></div>
          : background === 'Books'
          ? <div className='bg-books image-position h-screen z-0'></div>
          : background === 'None'
          ? <div className='bg-palette-white'></div>
          : "" }
        {/* end of background ternary */}
      </div>
    );
  }
}


function mapState(state) {
  return {
    background: state.background
  }
}

export default connect(mapState, { getBackground })(BackgroundTernary);