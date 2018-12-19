import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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

  componentDidUpdate(prevProps) {
    if(prevProps.needsUpdate !== this.props.needsUpdate) {
      this.fetchTasks();
    }
  }

  render() {
    let tasks = this.state.tasks.map(task => {
      return (
        <div key={task.id}>
          <div>{task.title}</div>
          <div>{task.description}</div>
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