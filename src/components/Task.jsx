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
            className='border-l-4 border-green mx-4 my-2 rounded'
            key={this.props.task.id}>
            <div 
              className='border border-grey shadow bg-white rounded-r p-2'
              onClick={ () => this.props.openDetailModal(this.props.task.id) } >
              <div className='py-4 px-2'>{this.props.task.title}</div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Task;