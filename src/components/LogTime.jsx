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
      userId: this.props.userId,
      fieldsRequired: false
    }
  }

  async newTimelog() {
    if(!this.state.spent_time || !this.state.estimate_change || !this.state.comment) {
      this.setState({
        fieldsRequired: true
      })
    } else {
      await axios.post('/api/timelog', { ...this.state })
      this.setState({
        spent_time: '',
        estimate_change: '',
        comment: '',
      })
      this.props.getTasksAndLogs();
    }
  }
  
  render() {
    return (
      <div className='flex flex-col'>
         <div className='flex justify-center m-2'>
            {this.state.fieldsRequired ? <div className='text-red-lighter'>All fields required</div> : ""}
          </div>
        <label className='text-smoke p-2'>Time spent: </label>
        <input
          autoFocus="autofocus"
          onChange={ (e) => this.setState({ spent_time: e.target.value, fieldsRequired: false })}
          className='appearance-none bg-transparent text-grey-darker px-4 leading-tight focus:outline-none border-b border-grey m-2 pb-2' 
          type="number"
          value={ this.state.spent_time } />
        <label className='text-smoke p-2'>Estimate change: </label>
        <input
          onChange={ (e) => this.setState({ estimate_change: e.target.value, fieldsRequired: false })} 
          className='appearance-none bg-transparent text-grey-darker px-4 leading-tight focus:outline-none border-b border-grey m-2 pb-2'
          type="number"
          value={ this.state.estimate_change }/>
        <label className='text-smoke p-2'>Comment: </label>
        <input
          className='appearance-none bg-transparent text-grey-darker px-4 leading-tight focus:outline-none border-b border-grey m-2 pb-2'
          onChange={ (e) => this.setState({ comment: e.target.value, fieldsRequired: false })}
          onKeyUp={event => {
            if (event.key === 'Enter') {
              this.newTimelog()
            }
          }} 
          type="text"
          value={ this.state.comment } />
        <div className='flex justify-end'>
          <button
            onClick={ () => this.newTimelog() } 
            className='btn-reg bg-blue hover:bg-blue-dark hover:border-blue-dark m-2'>Save
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
