import React, { Component } from 'react';
import axios from 'axios';

class DetailModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: {},
      log: {}
    }
  }
  
  async componentDidMount() {
    let res = await axios.get(`/api/details/${this.props.detailTaskId}`);
    console.log(res.data)
    this.setState({
      task: res.data.task[0],
      log: res.data.logs[0]
    })
    
  }

  render() {
    const { task, log } = this.state;
    return (
      <div className='fixed pin-r pin-t w-full h-screen'>
        <div className='flex absolute pin-x pin-t bg-grey p-6'>
          <div className='border bg-white w-full'>
            <div>
              <div>Initial time estimate: {task.initial_estimate} hours</div>
              <div>Current estimate: </div>
              <div>Spent: </div>
              <div>Remaining: </div>
            </div>
            <hr/>
            <div>{task.title}</div>
            <div>{task.created_at}</div>
            <div>{task.description}</div>
            <div>In lane: {task.status}</div>
          </div>
          <div className='border bg-white w-full'>
            <div>
              <div>Log time:</div>
              <label>Time spent: </label>
              <input type="text"/>
              <label>Estimate change: </label>
              <input type="text"/>
              <label>Comment: </label>
              <input type="text"/>
              <button>SAVE</button>
            </div>
            { !log ? "" :
              <div>
                <div>History</div>
                <div>{log.username} logged time on {log.created_at}</div>
                <div>Time spent: {log.spent_time}</div>
                <div>Estimate change: {log.estimate_change}</div>
                <div>{log.comment}</div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DetailModal;