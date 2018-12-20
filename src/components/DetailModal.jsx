import React, { Component } from 'react';
import axios from 'axios';

class DetailModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: {},
      logs: []
    }
  }
  
  async componentDidMount() {
    let res = await axios.get(`/api/details/${this.props.detailTaskId}`);
    console.log(res.data)
    this.setState({
      task: res.data.task[0],
      logs: res.data.logs
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
    let currentEstimate = task.initial_estimate - calculateEstimate();
    //calculating time spent from the all logs for this task
    let timeSpent = function() {
      return logs.reduce((acc, logValue) => {
        return acc + +logValue.spent_time;
      }, 0)
    }();

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
        <div className='flex absolute pin-x pin-t bg-grey p-6'>
          <div className='border w-full p-4'>
            <div>
              <div>Initial time estimate: {task.initial_estimate} hours</div>
              <div>Current estimate: {currentEstimate} hours</div>
              <div>Spent: {timeSpent} hours</div>
              <div>Remaining: {remaining} hours</div>
            </div>
            <hr/>
            <div>{task.title}</div>
            <div>Created on: {task.created_at}</div>
            <div>Description: {task.description}</div>
            <div>In lane: {task.status}</div>
          </div>
          <div className='border w-full p-4'>
            <div>
              <div>Log time:</div>
              <label>Time spent: </label>
              <input
                className='input-underlined focus:outline-none m-2 bg-grey border-white lg:w-3/4' 
                type="text"/>
              <label>Estimate change: </label>
              <input 
                className='input-underlined focus:outline-none m-2 bg-grey border-white lg:w-3/4'
                type="text"/>
              <label>Comment: </label>
              <input 
                className='input-underlined focus:outline-none m-2 bg-grey border-white lg:w-3/4'
                type="text"/>
              <button className='bg-green border border-green hover:bg-green-dark hover:border-green-dark text-white rounded-full p-2 mt-6' >Save</button>
            </div>
            { !logs ? "" :
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