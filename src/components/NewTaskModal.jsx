import React, { Component } from 'react';
import axios from 'axios';

class NewTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      estimate: '',
      status: '',
      projectId: '',
      editTaskId: '',
    }
    this.addTask = this.addTask.bind(this);
    this.editTask = this.setModal.bind(this);
  }

  async addTask() {
    const { title, description, estimate, status, projectId } = this.state;
    await axios.post('/api/task', { title, description, estimate, status, projectId });
    this.setState({
      title: '',
      description: '',
      estimate: '',
      status: '',
      projectId: ''
    })
  }

  async editTask() {
    console.log('running on the front?')
    const { title, description, estimate, projectId, editTaskId } = this.state;
    let res = await axios.put(`/api/task/${editTaskId}`, { title, description, estimate, projectId } )
    console.log("Testing testing", res);
    this.setState({
      editTaskId: '',
    })
  }
  
  render() {
    return (
      <div>
        { this.state.modal ?
        <div className='fixed pin-r pin-t w-full h-screen'>
          <div className='absolute pin-x pin-t h-64 bg-white'>
            <button onClick={ () => this.setState({ modal: !this.state.modal })} className='float-right cursor-pointer'>
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
        : ""
        }
      </div>
    );
  }
}

export default NewTaskModal;