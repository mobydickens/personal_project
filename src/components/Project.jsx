import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import { connect } from 'react-redux';
import { getProjectId, getTasks } from '../ducks/reducer';
import Lane from './Lane.jsx';
import NewTaskModal from './NewTaskModal.jsx';
import DetailModal from './DetailModal.jsx';
import ProjectHeader from './ProjectHeader.jsx';
import axios from 'axios';

import { DragDropContext } from 'react-beautiful-dnd';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needsUpdate: false,
      laneNames: ['To Do', 'In Progress', 'Testing', 'Done'],
      modal: false,
      status: '',
      projectId: '',
      detailModal: false,
      detailTaskId: '',
      columns: {}
    }
    this.fetchTasks = this.fetchTasks.bind(this);
  }
  
  async componentDidMount() {
    await this.props.getProjectId(this.props.match.params.id);
    await this.fetchTasks(this.props.match.params.id);
  }
  
  async fetchTasks(id) {
    let res = await axios.get(`/api/tasks/${id}`);
    this.props.getTasks(res.data);
  }

  //exit modal is triggered mainly from NewTaskModal component whenever modal needs to be closed
  exitModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  //this function is used in newTaskModal component after completing post endpoint for adding a new task
  componentNeedsUpdate = () => {
    this.setState({
      needsUpdate: !this.state.needsUpdate
    })
  }

  //upon task being added will update lanes to reflect new tasks
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.needsUpdate !== this.props.needsUpdate) {
      this.fetchTasks();
    }
  }

  openDetailModal = (id) => {
    this.setState({
      detailModal: !this.state.detailModal,
      detailTaskId: id
    })
  }

  //set column states:

  //react-beautiful-dnd
  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index 
      ) {
        return;
    }
    console.log("droppable id: ", source.droppableId) //where task is COMING FROM
    // const column = this.state[source.droppableId];
    // console.log("column?" , column)
    // const newTaskIds = Array.from(source.droppableId.)
  }
  //draggable id = id of the TASK user was dragging
  //source = location info about where it started. DroppableId = which status started and index, the index
  //destination droppable id, where status ends and index

  render() {
    // this variable is for dynamically rendering all four lanes with the correct name and an add task icon
    let lanes = this.state.laneNames.map((name, i) => {
      return (
        <div
          className='m-2 lg:w-full bg-white shadow-md pb-4'
          key={i}>
          <div className='flex justify-between'>
            <div className='m-6'>{name}</div>
            <i onClick={ () => this.setState({ modal: !this.state.modal, status: name, projectId: this.props.match.params.id })} className="fas fa-plus m-6"></i>
          </div>
          <Lane
            projectId={this.props.match.params.id} 
            status={ name } 
            needsUpdate={ this.state.needsUpdate }
            triggerEdit={ this.triggerEdit }
            openDetailModal={ this.openDetailModal }
          />
        </div>
      )
    })

    return (
      <div>
        <LoggedInHeader />
        <div className='w-screen h-full lg:h-screen bg-grey-light pt-4'>
          <ProjectHeader projectId={ this.props.match.params.id }/>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className='flex flex-col lg:flex-row p-4'>
              {lanes}
            </div>
          </DragDropContext>
          {/* Below is the modal which is not always visible */}
          { this.state.modal ?
            <NewTaskModal 
              modal={ this.state.modal } 
              status={ this.state.status }
              projectId={ this.state.projectId }
              updateStateFn={ this.setStateFromModal }
              exitModal={ this.exitModal }
              needsUpdateFn={ this.componentNeedsUpdate }
              triggerEdit/>
            : "" }
          { !this.state.detailModal ? ""
            : <DetailModal 
              detailTaskId={ this.state.detailTaskId }
              detailModal={ this.openDetailModal }
              needsUpdate={ this.componentNeedsUpdate } /> }
          <div className='flex justify-center'>
          <button 
            onClick={ () => this.deleteProject(this.props.match.params.id) } 
            className='m-4 text-sm lg:hidden'>
            <i className="fas fa-trash-alt"></i>
          </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    tasks: state.currentProjectTasks
  }
}

export default connect(mapState, { getProjectId, getTasks })(Project);