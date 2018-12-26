//lives in project
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Task from './Task.jsx';

// import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

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

    return (
      <Droppable droppableId={this.props.status}>
        { provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='flex flex-col'>
            {this.state.tasks.map(task => <Task key={task.id} task={task} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default connect(null)(Lane);