import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import { connect } from 'react-redux';
import Lane from './Lane.jsx';
import axios from 'axios';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needsUpdate: false,
      laneNames: ['To Do', 'In Progress', 'Testing', 'Done'],
      modal: false,
      title: '',
      description: '',
      estimate: '',
      status: '',
      projectId: '',
      projectName: ''
    }
    this.addTask = this.addTask.bind(this);
  }
  
  async componentDidMount() {
    let res = await axios.get(`/api/project/${this.props.match.params.id}`);
    this.setState({
      projectName: res.data.title
    })
  }

  async addTask() {
    const { title, description, estimate, status, projectId } = this.state;
    await axios.post('/api/task', { title, description, estimate, status, projectId });
    this.setState({
      needsUpdate: true,
      modal: false,
      title: '',
      description: '',
      estimate: '',
      status: '',
      projectId: ''
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.needsUpdate !== this.state.needsUpdate) {
      console.log('component updating!!!');
    }
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
          <Lane projectId={this.props.match.params.id} status={name}/>
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
        <div className='fixed pin-r pin-t w-full h-screen'>
          <div className='absolute pin-x pin-t h-64 bg-white'>
            <button onClick={ () => this.setState({ modal: !this.state.modal })} className='float-right cursor-pointer'>
              <i className="fas fa-times"></i>
            </button>
            <label>Enter a title for this task:</label>
            <input onChange={ (e) => this.setState({ title: e.target.value })} type="text"/>
            <label>Description</label>
            <input onChange={ (e) => this.setState({ description: e.target.value })} type="text"/>
            <label>Initial Time Estimate for this task:</label>
            <input onChange={ (e) => this.setState({ estimate: e.target.value })} type="numbers"/>
            <button onClick={ () => this.addTask() }>Add</button>
          </div>
        </div>
        : ""
        }
      </div>
    );
  }
}

export default connect(null)(Project);