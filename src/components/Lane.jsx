//lives in project
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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

  render() {
    let tasks = this.state.tasks.map(task => {
      return (
        <div
          key={task.id}>
          <div 
            className='bg-white m-2 border'
            onClick={ () => this.props.openDetailModal(task.id) } >
            <div className='p-4'>{task.title}</div>
          </div>
        </div>
      )
    })

    return (
      <div
        className='flex flex-col'>
        {tasks}
      </div>
    );
  }
}

export default connect(null)(Lane);