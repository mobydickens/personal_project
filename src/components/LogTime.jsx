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
        <div>Log time:</div>
        <label>Time spent: </label>
        <input
          onChange={ (e) => this.setState({ spent_time: e.target.value})}
          className='input-underlined focus:outline-none m-2 bg-grey border-white lg:w-3/4' 
          type="number"
          value={ this.state.spent_time } />
        <label>Estimate change: </label>
        <input
          onChange={ (e) => this.setState({ estimate_change: e.target.value})} 
          className='input-underlined focus:outline-none m-2 bg-grey border-white lg:w-3/4'
          type="number"
          value={ this.state.estimate_change } />
        <label>Comment: </label>
        <input
          onChange={ (e) => this.setState({ comment: e.target.value})} 
          className='input-underlined focus:outline-none m-2 bg-grey border-white lg:w-3/4'
          type="text"
          value={ this.state.comment } />
        <button
          onClick={ () => this.newTimelog() } 
          className='bg-green border border-green hover:bg-green-dark hover:border-green-dark text-white rounded-full p-2 mt-6 focus:outline-none' >Save</button>
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
