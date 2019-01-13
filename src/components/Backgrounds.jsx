import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBackground } from '../ducks/reducer';
import axios from 'axios';

class Backgrounds extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundSaved: false
    }
  }
  
  saveBackground = (background) => {
    axios.put(`/api/background/${this.props.userId}`, { background }).then(res => console.log(res.data));
    this.setState({
      backgroundSaved: true
    })
  }

  render() {
    return (
      <div>
        <select className='bg-palette-white border border-palette-white focus:outline-none ml-4' onChange={(e) => this.props.getBackground(e.target.value)}>
          <option defaultValue="selected">Choose background</option>
          <option value="Keyboard">Keyboard</option>
          <option value="White Brick">White Brick</option>
          <option value="Coffee">Coffee</option>
          <option value="Flight">Flight</option>
          <option value="Puppers">Puppers</option>
          <option value="Decay">Decay</option>
          <option value="Books">Books</option>
          <option value="Cityscape">Cityscape</option>
          <option value="Field">Field</option>
          <option value="Desert">Desert</option>
          <option value="Pier">Pier</option>
          <option value="None">None</option>
        </select>
        <button
          onClick={ () => this.saveBackground(this.props.background) }
          className={ this.state.backgroundSaved ? 'bg-green rounded mx-1 py-1 px-2 text-white focus:outline-none' : 'bg-blue rounded mx-1 py-1 px-2 text-black focus:outline-none'}>{this.state.backgroundSaved ? 'Saved!' : 'Save'}
        </button>
      </div>
    );
  }
}
function mapState(state) {
  return {
    background: state.background,
    userId: state.userId
  }
}
export default connect(mapState, { getBackground })(Backgrounds);