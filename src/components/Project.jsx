import React, { Component } from 'react';
import Header from './Header.jsx';
import { connect } from 'react-redux';
import { getProjectId, getTasks, resetProject, userProjects, userLogin } from '../ducks/reducer';
import Lane from './Lane.jsx';
import NewTaskModal from './NewTaskModal.jsx';
import DetailModal from './DetailModal.jsx';
import ProjectHeader from './ProjectHeader.jsx';
import axios from 'axios';
import Loading from './Loading.jsx';
import { requireLogin } from '../helpers/login_service';

import { DragDropContext } from 'react-beautiful-dnd';
import BackgroundTernary from './BackgroundTernary.jsx';

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
      columns: {},
      loggedIn: false,
      loading: true
    }
    this.fetchTasks = this.fetchTasks.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
    
    async componentDidMount() {
      await requireLogin(this.props.userLogin, this.props.history);
      await Promise.all([
        this.props.getProjectId(this.props.match.params.id), 
        this.fetchTasks(this.props.match.params.id)
      ]);
      await this.sortColumns();
      this.setState({
        loading: false,
        loggedIn: true
      })
  }
  
  // axios call to endpoint that will fetch ALL tasks for a project
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
  
  //this function is used in newTaskModal component after completing post endpoint for adding a new task. Will trigger component did update to trigger fetch tasks and reset the state in the reducer function. 
  componentNeedsUpdate = () => {
    this.setState({
      needsUpdate: !this.state.needsUpdate
    })
  }
  
  //upon task being added will update lanes to reflect new tasks
  componentDidUpdate(prevProps, prevState) {
    if(prevState.needsUpdate !== this.state.needsUpdate) {
      this.fetchTasks(this.props.match.params.id);
    }
  }

  //opens the modal to see task details
  openDetailModal = (id) => {
    this.setState({
      detailModal: !this.state.detailModal,
      detailTaskId: id
    })
  }

  //sort tasks into columns for the on Drag End function below. 
  sortColumns = () => {
    let columns = {
      'To Do': { id: 'To Do', taskIds: [] }, 
      'In Progress': { id: 'In Progress', taskIds: [] }, 
      'Testing': { id: 'Testing', taskIds: [] }, 
      'Done': { id: 'Done', taskIds: [] }
    }
    this.props.tasks.forEach(task => {
      if(task.status === columns['To Do'].id) {
        columns['To Do'].taskIds.push(task.id);
      } else if(task.status === columns['In Progress'].id) {
        columns['In Progress'].taskIds.push(task.id);
      } else if(task.status === columns['Testing'].id) {
        columns['Testing'].taskIds.push(task.id);
      } else if(task.status === columns['Done'].id) {
        columns['Done'].taskIds.push(task.id);
      }
    })
    this.setState({
      columns: columns
    })
  }

  // This function was written to be used in my OnDragEnd function below when reordering my lane orders
  async updateLaneOrders(id, index) {
    await axios.put(`/task/${id}`, {index: index} );
  }

  async updateOrderAndStatus(id, index, status) {
    await axios.put(`/taskstatus/${id}`, { index: index, status: status });
  }

  //react-beautiful-dnd
  async onDragEnd(result) {
    //if there is no destination for the task, return
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    //if the destination end is the same as destination start, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index 
      ) {
        return;
    }
    
    const start = this.state.columns[source.droppableId]; 
    const finish = this.state.columns[destination.droppableId]
    //check whether start column is the same as the finish destination for the task. 
    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); 
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
      // need to hold all the promises in a variable until I am ready to call them all at once
      let taskUpdatePromises = newColumn.taskIds.map((taskId, index) => {
        return this.updateLaneOrders(taskId, index);
      })
  
      // SET columns in state while I am waiting for my axios calls to finish (otherwise I have jumping tasks in my lanes)
      let copyOfTasks = this.props.tasks.map(task => {
        let index = newTaskIds.indexOf(task.id);
        if(index !== -1) {
          task.lane_order = index; 
        }
        return task;
      });
      this.props.getTasks(copyOfTasks);
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }
      this.setState(newState);
      await Promise.all(taskUpdatePromises); 
      return;
    }
    // MOVING FROM ONE LANE TO ANOTHER
    //this startTaskIds contains same ids as the old array named newTaskIds above
    const startTaskIds = Array.from(start.taskIds);
    //remove the dragged task id from this array. 
    startTaskIds.splice(source.index, 1);

    //this creates a new START column with the new StartTaskIds array (the task should be missing)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    //contains same task ids as the last FINISH column
    const finishTaskIds = Array.from(finish.taskIds);
    //inserting the draggable id from destination that we spliced out of the startTaskIds
    finishTaskIds.splice(destination.index, 0, draggableId);
    //new column for the FINISH. Should have one index added
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }
    //copy to send to reducer while waiting for promises
    let copyOfTasks = this.props.tasks.map(task => {
      let index = startTaskIds.indexOf(task.id);
      if(index !== -1) {
        task.lane_order = index; 
      }
      let otherIndex = finishTaskIds.indexOf(task.id);
      if(otherIndex !== -1) {
        task.lane_order = otherIndex;
        task.status = destination.droppableId;
      }
      return task;
    });

    let startPromises = newStart.taskIds.map((taskId, index) => {
      return this.updateOrderAndStatus(taskId, index, source.droppableId);
    })

    let finishPromises = newFinish.taskIds.map((taskId, index) => {
      return this.updateOrderAndStatus(taskId, index, destination.droppableId);
    })

    this.props.getTasks(copyOfTasks);
    
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);

    try {
      await Promise.all(startPromises);
      await Promise.all(finishPromises);
    } catch (e) {
      console.error("Failed to save tasks", e)
    } 
    this.fetchTasks(this.props.match.params.id)
    return;
  }

  deleteProject = (id) => {
    
    axios.delete(`/api/deleteproject/${id}`).then(res => {
      this.props.userProjects(res.data);
    });
    this.props.history.push('/home');
    this.props.resetProject();
  }

  render() {
   
    // this variable is for dynamically rendering all four lanes with the correct name and an add task icon
    let lanes = this.state.laneNames.map((name, i) => {
      return (
        <div
          className='m-2 lg:w-full bg-grey-lighter shadow-md pb-4 min-h-100'
          key={i}>
          <div className='flex justify-between'>
            <div className='m-6'>{name}</div>
            <i onClick={ () => this.setState({ modal: !this.state.modal, status: name, projectId: this.props.match.params.id })} className="fas fa-plus m-6 cursor-pointer"></i>
          </div>
          <Lane
            projectId={this.props.match.params.id} 
            status={ name } 
            needsUpdate={ this.state.needsUpdate }
            triggerEdit={ this.triggerEdit }
            openDetailModal={ this.openDetailModal }
            columns={this.state.columns}
          />
        </div>
      )
    })

    return (
      <div>
        <div className='absolute pin-t z-10 w-full'>
          <Header />
        </div>
        { this.state.loading ? 
        <div className='mt-20'>
          <Loading />
        </div> :
         
          <div>
          <BackgroundTernary />
          <div className='absolute mt-20 w-full'>
            <ProjectHeader projectId={ this.props.match.params.id }/>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div className='flex flex-col lg:flex-row p-4 mb-8'>
                {lanes}
              </div>
            </DragDropContext>

            {/* Below are the modals which are not always visible */}
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

            {/* delete project button at bottom of page */}
            <button 
              onClick={ () => this.deleteProject(this.props.match.params.id) } 
              className='absolute lg:fixed pin-b pin-l m-4 text-sm bg-black p-w rounded-full hover:bg-red'>
              <div className="text-white p-2">Delete project</div>
            </button>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

function mapState(state) {
  return {
    tasks: state.currentProjectTasks
  }
}

export default connect(mapState, { getProjectId, getTasks, resetProject, userProjects, userLogin })(Project);