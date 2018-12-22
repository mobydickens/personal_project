import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import { connect } from 'react-redux';
import { getProjectId } from '../ducks/reducer';
import Lane from './Lane.jsx';
import NewTaskModal from './NewTaskModal.jsx';
import DetailModal from './DetailModal.jsx';
import ProjectHeader from './ProjectHeader.jsx';
// import axios from 'axios';

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
   
    }
  }
  
  componentDidMount() {
    this.props.getProjectId(this.props.match.params.id);
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

  openDetailModal = (id) => {
    this.setState({
      detailModal: !this.state.detailModal,
      detailTaskId: id
    })
  }

  render() {
    // this variable is for dynamically rendering all four lanes with the correct name and an add task icon
    let lanes = this.state.laneNames.map((name, i) => {
      return (
        <div
          className='border m-2 lg:w-full bg-white'
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
        <div className='w-screen h-screen bg-grey-lighter pt-4'>
          <ProjectHeader projectId={ this.props.match.params.id }/>
          <div className='flex flex-col lg:flex-row p-4'>
            {lanes}
          </div>
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
        </div>
      </div>
    );
  }
}

export default connect(null, { getProjectId })(Project);