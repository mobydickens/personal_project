import React, { Component } from 'react';
import axios from 'axios';
import LogTime from './LogTime.jsx';
import EditTask from './EditTask.jsx';
import { connect } from 'react-redux';
import moment from 'moment';
import Loading from './Loading.jsx';
import ProgressBar from './ProgressBar.jsx';

import { calculateSpent, calculateEstimate } from '../helpers/timelog_helper';

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
      comment: '',
      loading: true

    }
    this.getTasksAndLogs = this.getTasksAndLogs.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  
  async componentDidMount() {
    await this.getTasksAndLogs()
    this.setState({
      loading: false
    })
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
    
    //CALCULATIONS// --> tested function are saved in HELPER FOLDER -> TIMELOG_HELPER
    //calculating currentEstimate by subtracting initial estimate from the estimated change from function above. 
    let currentEstimate = +task.initial_estimate + calculateEstimate(logs);
    //calculating time spent from the all logs for this task
    let timeSpent = calculateSpent(logs);
    // remaining calculates with current estimate, not original
    let remaining = Number((currentEstimate - timeSpent).toFixed(2));
    
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
              <div>
                <span className='font-semibold'>{timelog.username} </span>
                <span className='text-smoke'> - {moment(timelog.created_at).calendar()}</span>
              </div>
              <div className='text-sm'>Time spent: 
                <input className='ml-12 appearance-none text-grey-darker py-1 px-2 leading-tight focus:outline-none border-b border-grey' onChange={ (e) => this.setState({ spent_time: e.target.value})}value={this.state.spent_time} type="number"/>
              </div> 
              <div className='text-sm'>Estimate change: 
                <input className='ml-2 appearance-none text-grey-darker py-1 px-2 leading-tight focus:outline-none border-b border-grey' onChange={ (e) => this.setState({ estimate_change: e.target.value})}value={this.state.estimate_change} type="number"/>
              </div>
              <div className='text-sm'>Comment:   
                <input className='ml-12 appearance-none text-grey-darker py-1 px-2 leading-tight focus:outline-none border-b border-grey'onChange={ (e) => this.setState({ comment: e.target.value})}value={this.state.comment} type="text"/>
              </div>
              <button 
                className='btn-reg bg-blue hover:bg-blue-dark hover:border-blue-dark m-2' 
                onClick={ () => this.saveTimelogEdit(timelog.id) }>Save</button>
              <button className='m-2' onClick={ () => this.setState({ editingLog: false })}>Cancel</button>
            </div>
            : 
            <div className={ +this.props.userId === timelog.user_id ? 'border-b border-grey-lighter' : 'border-b border-grey-lighter pb-4'}>
              {/* regular history mode - not editing */}
              <div>
                <span className='font-semibold'>{timelog.username} </span>
                <span className='text-smoke text-sm'> - {moment(timelog.created_at).calendar()}</span>
              </div>
              <div className='text-sm'>Spent: {timelog.spent_time > 1 ? timelog.spent_time + ' hours' : timelog.spent_time + ' hour'}, estimate change: {timelog.estimate_change > 1 ? timelog.estimate_change + ' hours' : timelog.estimate_change + ' hour'}</div>
              <div className='text-sm'>Comment: {timelog.comment}</div>
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
        <div className='relative p-2 lg:p-8 bg-white w-full max-w-md m-auto flex-col flex lg:rounded'>
          { this.state.loading ? 
          <Loading />
          : 
          <div>
            <button onClick={ () => this.props.detailModal() } className='absolute pin-t pin-r p-4 cursor-pointer'>
              <i className="fas fa-times"></i>
            </button>
            <div className='w-full p-8 lg:p-4'>
              <EditTask 
                task={ task }
                getTasksAndLogs={ this.getTasksAndLogs}
                needsUpdate={ this.props.needsUpdate } />
              <div>
                <div className='flex justify-center mt-6'>
                  <div 
                    className='text-white border border-blue bg-blue rounded py-1 px-2 m-1 text-xs'>Initial estimate: {task.initial_estimate} { task.initial_estimate > 1 ? 'hours' : 'hour' }
                  </div>
                  <div 
                    className='text-white border border-blue bg-blue rounded py-1 px-2 m-1 text-xs'>Current estimate: {currentEstimate} { currentEstimate > 1 ? 'hours' : 'hour' }
                  </div>
                  <div 
                    className='text-white border border-blue bg-blue rounded py-1 px-2 m-1 text-xs'>Spent: {timeSpent.toFixed()} { timeSpent > 1 ? 'hours' : 'hour' }
                  </div>
                  <div 
                    className='text-white border border-blue bg-blue rounded py-1 px-2 m-1 text-xs'>Remaining: {remaining} { remaining > 1 ? 'hours' : 'hour' }
                  </div>
                </div>
              </div>
              <ProgressBar timeSpent={timeSpent.toFixed(2)} remaining={remaining} currentEstimate={currentEstimate}/>
            </div>
            <div className='w-full p-2'>
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
          }
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