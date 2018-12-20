import React, { Component } from 'react';
import axios from 'axios';
import LogTime from './LogTime.jsx';
import EditTask from './EditTask.jsx';

class DetailModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: {},
      logs: []
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
    
    //the map below makes a div of log history for each timelog
    let timelogs = this.state.logs.map(timelog => {
      return (
        <div
          className='m-2' 
          key={timelog.id}>
          <div>{timelog.username} logged time on {timelog.created_at}</div>
          <div>Time spent: {timelog.spent_time}</div>
          <div>Estimate change: {timelog.estimate_change}</div>
          <div>{timelog.comment}</div>
        </div>
      )
    })

    return (
      <div className='fixed pin-r pin-t w-full h-screen'>
        <div className='flex flex-col lg:flex-row absolute pin-x pin-t bg-grey p-6'>
          <div className='border w-full p-4'>
            <div>
              <div>Initial time estimate: {task.initial_estimate} { task.initial_estimate > 1 ? 'hours' : 'hour' }</div>
              <div>Current estimate: {currentEstimate} { currentEstimate > 1 ? 'hours' : 'hour' }</div>
              <div>Spent: {timeSpent} { timeSpent > 1 ? 'hours' : 'hour' }</div>
              <div>Remaining: {remaining} { remaining > 1 ? 'hours' : 'hour' }</div>
            </div>
            <hr/>
            <EditTask 
              task={ task }
              getTasksAndLogs={ this.getTasksAndLogs}
              needsUpdate={ this.props.needsUpdate } />
            <div>
              <button onClick={ () => this.deleteTask(this.props.detailTaskId) }>Delete task</button>
            </div>
          </div>
          <div className='border w-full p-4'>
            <div className='flex justify-end'>
              <button onClick={ () => this.props.detailModal() } className='cursor-pointer'>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <LogTime 
              taskId={ this.props.detailTaskId }
              getTasksAndLogs={ this.getTasksAndLogs }/>
            { !logs[0] ? "" :
              <div className='m-2'>
                <div>History</div>
                {timelogs}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DetailModal;