import React, { Component } from 'react';
import axios from 'axios';

class NewTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editTaskId: '',
      title: '',
      description: '',
      estimate: '',
    }
    this.addTask = this.addTask.bind(this);
    this.editTask = this.setModal.bind(this);
    this.setModal = this.setModal.bind(this);
  }

  async addTask() {
    const { title, description, estimate } = this.state;
    const { status, projectId } = this.props;
    await axios.post('/api/task', { title, description, estimate, status, projectId });
    this.setState({
      title: '',
      description: '',
      estimate: ''
    })
  }

  async editTask() {
    console.log('running on the front?')
    const { title, description, estimate } = this.state;
    const { projectId, editTaskId } = this.props;
    let res = await axios.put(`/api/task/${editTaskId}`, { title, description, estimate, projectId } )
    console.log("Testing testing", res);
    this.setState({
      editTaskId: '',
    })
  }

  async setModal() {
    let res = await axios.get(`/api/task/${this.props.editTaskId}`);
    this.props.setStateFn();
    this.setState({
      editing: true,
      editTaskId: this.props.editTaskId,
      title: res.data.title,
      description: res.data.description,
      estimate: res.data.initial_estimate
    })
  }

  render() {
    return (
      <div className='fixed pin-r pin-t w-full h-screen'>
        <div className='absolute pin-x pin-t h-64 bg-white'>
          <button onClick={ () => this.props.exitModal() } className='float-right cursor-pointer'>
            <i className="fas fa-times"></i>
          </button>
          <label>Enter a title for this task:</label>
          <input 
            onChange={ (e) => this.setState({ title: e.target.value })} 
            type="text"
            value={ this.state.title }/>
          <label>Description</label>
          <input 
            onChange={ (e) => this.setState({ description: e.target.value })} 
            type="text"
            value={ this.state.description }/>
          <label>Initial Time Estimate for this task:</label>
          <input 
            onChange={ (e) => this.setState({ estimate: e.target.value })} 
            type="numbers"
            value={ this.state.estimate } />
          { !this.state.editing ? 
            <button onClick={ () => this.addTask() }>Add</button> 
            : <button onClick={ () => this.editTask() }>Save</button>
          }
        </div>
      </div>
    );
  }
}

export default NewTaskModal;