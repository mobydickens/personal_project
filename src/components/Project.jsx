import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import { connect } from 'react-redux';
import Lane from './Lane.jsx';
import axios from 'axios';
import NewTaskModal from './NewTaskModal.jsx';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needsUpdate: false,
      laneNames: ['To Do', 'In Progress', 'Testing', 'Done'],
      modal: false,
      status: '',
      projectId: '',
      editTaskId: ''
    }
  }
  
  async componentDidMount() {
    let res = await axios.get(`/api/project/${this.props.match.params.id}`);
    this.setState({
      projectName: res.data.title
    })
  }

  getTaskIdToEdit = (id) => {
    this.setState({
      editTaskId: id,
      modal: true
    })
  }

  setStateFromModal = () => {
    this.setState({
      status: '',
      modal: false,
      needsUpdate: true
    })
  }

  exitModal = () => {
    this.setState({
      modal: false
    })
  }

  render() {
    let lanes = this.state.laneNames.map((name, i) => {
      return (
        <div
          className='border w-full m-2'
          key={i}>
          <div className='flex justify-between'>
            <div className='m-6'>{name}</div>
            <i onClick={ () => this.setState({ modal: !this.state.modal, status: name, projectId: this.props.match.params.id })} className="fas fa-plus m-6"></i>
          </div>
          <Lane 
            projectId={this.props.match.params.id} 
            status={ name } 
            needsUpdate={ this.state.needsUpdate }
            getTaskIdToEdit={ this.getTaskIdToEdit }
          />
        </div>
      )
    })

    return (
      <div>
        <LoggedInHeader />
        <h3 className='m-6'>{this.state.projectName}</h3>
        <div className='flex flex-col lg:flex-row m-6'>
          {lanes}
        </div>
        { this.state.modal ?
          <NewTaskModal 
            modal={ this.state.modal } 
            status={ this.state.status }
            projectId={ this.state.projectId }
            updateStateFn={ this.setStateFromModal }
            editTaskId={ this.state.editTaskId }
            exitModal={ this.exitModal }/>
          : "" }
      </div>
    );
  }
}

export default connect(null)(Project);