import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBackground } from '../ducks/reducer';

class Backgrounds extends Component {

  render() {
    return (
      <div>
        <select className='bg-palette-white border border-palette-white focus:outline-none ml-4' onChange={(e) => this.props.getBackground(e.target.value)}>
          <option defaultValue="selected">Choose background</option>
          <option value="City Block">City Block</option>
          <option value="White Brick">White Brick</option>
          <option value="Blue Wall">Blue Wall</option>
          <option value="Coffee">Coffee</option>
          <option value="Misty Forest">Misty Forest</option>
          <option value="Flight">Flight</option>
          <option value="Puppers">Puppers</option>
          <option value="Decay">Decay</option>
          <option value="None">None</option>
        </select>
      </div>
    );
  }
}

export default connect(null, { getBackground })(Backgrounds);