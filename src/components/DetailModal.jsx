import React, { Component } from 'react';
import axios from 'axios';
import LogTime from './LogTime.jsx';
import EditTask from './EditTask.jsx';
import { connect } from 'react-redux';
import moment from 'moment';

class DetailModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: {},
      logs: [],
      editingLog: false,
      editingId: '',
      spent_time: '',
      estimate_change: '',
      comment: ''

    }
    this.getTasksAndLogs = this.getTasksAndLogs.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  
  componentDidMount() {
    this.getTasksAndLogs()
  }

  async getTasksAndLogs() {
    let res = await axios.get(`/api/details/${this.props.detailTaskId}`);
    this.setState({
      task: res.data.task[0],
      logs: res.data.logs
    }) 
  }

   //triggered by delete button below
   async deleteTask(id) {
    await axios.delete(`/api/task/${id}`);
    this.props.detailModal();
    this.props.needsUpdate();
  }

  // checkIfUser = (id, timelogid, spent, change, comment) => {
  //   console.log(id, this.props.userId)
  //   if(+this.props.userId === +id) {
  //   this.setState({
  //     editingLog: true, 
  //     editingId: timelogid, 
  //     spent_time: spent,
  //     estimate_change: change,
  //     comment: comment })
  //   } else {
  //     console.log('You can only edit your own timelogs')
  //   }
  // }

  //see render timelogs variable - this function is invoked upon save of the edits to a timelog
  async saveTimelogEdit(id) {
    const { spent_time, estimate_change, comment } = this.state;
    await axios.put(`/api/timelog/${id}`, { spent_time, estimate_change, comment } );
    this.getTasksAndLogs();
    this.setState({
      editingLog: false,
      editingId: '',
      spent_time: '',
      estimate_change: '',
      comment: ''
    })
  }

  render() {
    const { task, logs } = this.state;
    //CALCULATIONS//
    //this function calculates what the ALL logs say the estimate change adds up to be. 
    function calculateEstimate() {
      return logs.reduce((accumulator, logValue) => {
        return accumulator + +logValue.estimate_change;
      }, 0)
    }
    //calculating currentEstimate by subtracting initial estimate from the estimated change from function above. 
    let currentEstimate = +task.initial_estimate + calculateEstimate();
    //calculating time spent from the all logs for this task
    let timeSpent = function() {
      return logs.reduce((acc, logValue) => {
        return acc + +logValue.spent_time;
      }, 0)
    }();
    // remaining calculates with current estimate, not original
    let remaining = currentEstimate - timeSpent;
    
    //the map below makes a div of log history for each timelog that is created in the LogTime component
    let timelogs = this.state.logs.map(timelog => {
      return (
        <div
          className='m-2' 
          key={timelog.id}>
          {/* this ternary will control whether an item in the history is being edited, and will show/hide inputs */}
          { this.state.editingLog && this.state.editingId === timelog.id ? 
            <div>
              {/* editing mode */}
              <div>{timelog.username} logged time on {moment(timelog.created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
              <div>Time spent: 
                <input className='appearance-none text-grey-darker py-1 px-2 leading-tight focus:outline-none border-b border-grey' onChange={ (e) => this.setState({ spent_time: e.target.value})}value={this.state.spent_time} type="number"/>
              </div> 
              <div>Estimate change: 
                <input className='appearance-none text-grey-darker py-1 px-2 leading-tight focus:outline-none border-b border-grey' onChange={ (e) => this.setState({ estimate_change: e.target.value})}value={this.state.estimate_change} type="number"/>
              </div>
              <div>Comment: 
                <input className='appearance-none text-grey-darker py-1 px-2 leading-tight focus:outline-none border-b border-grey'onChange={ (e) => this.setState({ comment: e.target.value})}value={this.state.comment} type="text"/>
              </div>
              <button 
                className='m-2 bg-green border border-green hover:bg-green-dark hover:border-green-dark text-white rounded-full p-1 mt-2 focus:outline-none' 
                onClick={ () => this.saveTimelogEdit(timelog.id) }>Save</button>
              <button className='m-2' onClick={ () => this.setState({ editingLog: false })}>Cancel</button>
            </div>
            : 
            <div className='border-b border-grey-lighter'>
              {/* regular history mode - not editing */}
              <div><span className='text-green-dark'>{timelog.username}</span> logged time on {moment(timelog.created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
              <div>Time spent: {timelog.spent_time > 1 ? timelog.spent_time + ' hours' : timelog.spent_time + ' hour'}</div>
              <div>Estimate change: {timelog.estimate_change > 1 ? timelog.estimate_change + ' hours' : timelog.estimate_change + ' hour'}</div>
              <div>Comment: {timelog.comment}</div>
              {/* this ternary controls hiding and showing the edit button - only the person who created the timelog can edit it */}
              {  +this.props.userId === timelog.user_id ?
                <div className='flex justify-end'>
                  <button
                    className='text-smoke' 
                    onClick={ () => this.setState({
                      editingLog: true,
                      editingId: timelog.id,
                      spent_time: timelog.spent_time,
                      estimate_change: timelog.estimate_change,
                      comment: timelog.comment
                    }) }>
                    Edit
                  </button>
                </div>
                : ""
              } 
            </div>
            }
        </div>
      )
    })

    return (
      <div className='fixed pin z-50 overflow-auto bg-smoke-light flex'>
        <div className='relative p-8 bg-white w-full max-w-md m-auto flex-col flex lg:rounded'>
          <button onClick={ () => this.props.detailModal() } className='absolute pin-t pin-r p-4 cursor-pointer'>
            <i className="fas fa-times"></i>
          </button>
          <div className='w-full p-4'>
            <EditTask 
              task={ task }
              getTasksAndLogs={ this.getTasksAndLogs}
              needsUpdate={ this.props.needsUpdate } />
            <div>
              <div>
                <div>Initial time estimate: {task.initial_estimate} { task.initial_estimate > 1 ? 'hours' : 'hour' }</div>
                <div>Current estimate: {currentEstimate} { currentEstimate > 1 ? 'hours' : 'hour' }</div>
                <div>Spent: {timeSpent} { timeSpent > 1 ? 'hours' : 'hour' }</div>
                <div>Remaining: {remaining} { remaining > 1 ? 'hours' : 'hour' }</div>
              </div>
              
            </div>
          </div>
          <div className='w-full p-4'>
           
            <LogTime 
              taskId={ this.props.detailTaskId }
              getTasksAndLogs={ this.getTasksAndLogs }/>
            { !logs[0] ? "" :
              <div className='m-2'>
                <div className='text-smoke'>History</div>
                {timelogs}
              </div>
            }
          </div>
          <div className='flex justify-center'>
            <button className='text-red-lighter' onClick={ () => this.deleteTask(this.props.detailTaskId) }>Delete task</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return{
    userId: state.userId
  }
}
export default connect(mapState)(DetailModal);