import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBackground } from '../ducks/reducer';

class BackgroundTernary extends Component {

  render() {
    const { background } = this.props;
    return (
      <div>
        {/* start of background ternary */}
        {background === 'City Block' 
          ? <div className='bg-cityblock image-position h-screen z-0'></div> 
          : background === 'Puppers' 
          ? <div className='bg-puppers image-position h-screen z-0'></div>
          : background === 'White Brick'
          ? <div className='bg-whitebrick image-position h-screen z-0'></div> 
          : background === 'Blue Wall'
          ? <div className='bg-bluewall image-position h-screen z-0'></div>
          : background === 'Coffee'
          ? <div className='bg-coffee image-position h-screen z-0'></div>
          : background === 'Misty Forest'
          ? <div className='bg-misty image-position h-screen z-0'></div> 
          : background === 'Flight'
          ? <div className='bg-flight image-position h-screen z-0'></div>
          : background === 'Decay'
          ? <div className='bg-decay image-position h-screen z-0'></div>
          : background === 'None'
          ? <div className='bg-palette-white'></div>
          : <div className='bg-cityblock image-position h-screen z-0'></div> }
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