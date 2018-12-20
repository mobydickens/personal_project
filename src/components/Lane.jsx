//lives in project
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { getTaskId } from '../ducks/reducer';
// import Task from './Task.jsx';


class Lane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
    this.fetchTasks = this.fetchTasks.bind(this);
  }
  
  componentWillMount() {
    this.fetchTasks()
  }

  async fetchTasks() {
    let res = await axios.get(`/api/tasks?projectid=${this.props.projectId}&status=${this.props.status}`);
    this.setState({
      tasks: res.data
    })
  }

  //upon task being added will update lanes to reflect new tasks
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.needsUpdate !== this.props.needsUpdate) {
      this.fetchTasks();
    }
  }

  //triggered by button below (one inside each task)
  async deleteTask(id) {
    await axios.delete(`/api/task/${id}`);
    this.fetchTasks();
  }

  render() {
    let tasks = this.state.tasks.map(task => {
      return (
        <div
          className='bg-grey-lighter' 
          key={task.id}>
          <div className='bg-white m-2'>
            <div className='p-2'>{task.title}</div>
            <div className='flex justify-end m-2'>
              {/* this function comes from the reducer to get the task id that needs to be edited */}
              <button className='mx-2 text-grey' onClick={ () => this.props.triggerEdit(task.id) }>Edit</button>
              <button className='mx-2 text-grey' onClick={ () => this.deleteTask(task.id) }>Delete</button>
              <button className='mx-2 text-grey'>Log</button>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className='flex flex-col'>
        {tasks}
      </div>
    );
  }
}

export default connect(null)(Lane);