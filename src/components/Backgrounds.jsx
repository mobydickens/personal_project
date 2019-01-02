import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBackground } from '../ducks/reducer';

class Backgrounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: ''
    }
  }

  render() {
    return (
      <div>
        <select className='bg-palette-white border border-palette-white focus:outline-none ml-4' onChange={(e) => this.setState({background: e.target.value})}>
          <option defaultValue="selected">Choose background</option>
          <option value="white brick">City Block</option>
          <option value="white brick">White Brick</option>
          <option value="white brick">Blue Wall</option>
          <option value="white brick">Coffee</option>
          <option value="white brick">Misty Forest</option>
          <option value="white brick">Flight</option>
          <option value="puppers">Puppers</option>
          <option value="white brick">Decay</option>
        </select>
      </div>
    );
  }
}

export default connect(null, { getBackground })(Backgrounds);