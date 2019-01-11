import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

class Task extends Component {
  
  render() {
    return (
      <Draggable 
        draggableId={this.props.task.id} 
        index={this.props.index}>
        { provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className='border-l-4 border-blue mx-4 my-2 rounded'
            key={this.props.task.id}>
            <div 
              className='border border-grey shadow bg-white rounded-r p-2'
              onClick={ () => this.props.openDetailModal(this.props.task.id) } >
              <div className='py-2 px-2 text-base'>{this.props.task.title}</div>
              <div className='text-smoke px-2 text-sm'>{this.props.task.description}</div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Task;

