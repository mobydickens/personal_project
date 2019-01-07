import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class LogTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spent_time: '',
      estimate_change: '',
      comment: '',
      taskId: this.props.taskId,
      userId: this.props.userId
    }
  }

  async newTimelog() {
    await axios.post('/api/timelog', { ...this.state })
    this.setState({
      spent_time: '',
      estimate_change: '',
      comment: '',
    })
    this.props.getTasksAndLogs();
  }
  
  render() {
    return (
      <div>
        <label className='text-smoke'>Time spent: </label>
        <input
          autoFocus="autofocus"
          onChange={ (e) => this.setState({ spent_time: e.target.value})}
          className='input-underlined focus:outline-none my-2 border-grey' 
          type="number"
          value={ this.state.spent_time } />
        <label className='text-smoke'>Estimate change: </label>
        <input
          onChange={ (e) => this.setState({ estimate_change: e.target.value})} 
          className='input-underlined focus:outline-none my-2 border-grey'
          type="number"
          value={ this.state.estimate_change } /><br/>
        <label className='text-smoke'>Comment: </label>
        <input
          onChange={ (e) => this.setState({ comment: e.target.value})}
          onKeyUp={event => {
            if (event.key === 'Enter') {
              this.newTimelog()
            }
          }} 
          className='input-underlined focus:outline-none my-2 border-grey'
          type="text"
          value={ this.state.comment } />
        <div className='flex justify-end'>
          <button
            onClick={ () => this.newTimelog() } 
            className='btn-reg hover:bg-palette-dark hover:border-palette-dark m-2'>Save
          </button>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    userId: state.userId
  }
}
export default connect(mapState)(LogTime);
