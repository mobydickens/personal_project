//lives in project
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';

import { Droppable } from 'react-beautiful-dnd';

class Lane extends Component {
  
  render() {
    let tasks = this.props.tasks
      .filter(task => {
        return task.status === this.props.status})
      .map(task => <Task key={task.id} task={task} openDetailModal={this.props.openDetailModal} />)
      console.log(this.props.tasks)
      console.log(tasks)

    return (
      <Droppable droppableId={this.props.status}>
        { provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='flex flex-col'>
            {tasks}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

function mapState(state) {
  return {
    tasks: state.currentProjectTasks
  }
}
export default connect(mapState)(Lane);