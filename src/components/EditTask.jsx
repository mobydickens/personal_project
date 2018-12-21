import React, { Component } from 'react';
import axios from 'axios';

class EditTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      status: '',
      showTitleInput: false,
      showDescriptionInput: false,
      showStatusSelector: false
    }
  }
  
  async updateTitle() {
    await axios.put(`/api/updatetitle/${this.props.task.id}`, { title: this.state.title })
    this.props.getTasksAndLogs();
    this.setState({
      showTitleInput: false,
      title: ''
    })
  }

  async updateDescription() {
    await axios.put(`/api/updatedescription/${this.props.task.id}`, { description: this.state.description })
    this.props.getTasksAndLogs();
    this.setState({
      showDescriptionInput: false,
      description: ''
    })
  }

  async updateStatus() {
    await axios.put(`/api/updatestatus/${this.props.task.id}`, { status: this.state.status })
    this.props.getTasksAndLogs();
    this.props.needsUpdate();
    this.setState({
      showStatusSelector: false,
      status: ''
    })
  }

  render() {
    return (
      <div>
        <div 
          onClick={ () => this.setState({ showTitleInput: true, title: this.props.task.title }) } 
          className='my-2'>
          { !this.state.showTitleInput ? 
            this.props.task.title 
            : 
            <div className='flex flex-col lg:flex-row lg:border-b border-white py-2'>
              <input
                onChange={ (e) => this.setState({ title: e.target.value}) }
                className='input focus:outline-none bg-grey'
                value={this.state.title}
                type="text"/>
              <button onClick={ () => this.updateTitle() } className='mx-2'>Save</button>
              <button onClick={ (e) => e.stopPropagation() || this.setState({showTitleInput: false }) } className='mx-2'>Cancel</button> 
            </div> }
        </div>
        <div className='my-2'>Created on {this.props.task.created_at}</div>
        <div 
          onClick={ () => this.setState({ showDescriptionInput: true, description: this.props.task.description }) } 
          className='my-2'>
          { !this.state.showDescriptionInput ?
            <div>Description: {this.props.task.description}</div>
            :
            <div className='flex flex-col lg:flex-row lg:border-b border-white py-2'>
              <input
                onChange={ (e) => this.setState({ description: e.target.value}) }
                className='input focus:outline-none bg-grey'
                value={this.state.description}
                type="text"/>
              <button onClick={ () => this.updateDescription() } className='mx-2'>Save</button>
              <button onClick={ (e) => e.stopPropagation() || this.setState({ showDescriptionInput: false })} className='mx-2'>Cancel</button> 
            </div> 
          }
        </div>
        <div 
          onClick={ () => console.log('parent') || this.setState({showStatusSelector: true, status: this.props.task.status }) }
          className='my-2'>
          { !this.state.showStatusSelector ? 
            <div>In lane: {this.props.task.status}</div>
            : 
            <div className='flex flex-col lg:flex-row lg:border-b border-white py-2'>
              <select onChange={ (e) => this.setState( { status: e.target.value })}>
                <option defaultValue="selected">To Do</option>
                <option defaultValue="selected">In Progress</option>
                <option defaultValue="selected">Testing</option>
                <option defaultValue="selected">Done</option>
              </select>
              <button onClick={ () => this.updateStatus() } className='mx-2'>Save</button>
              <button onClick={ (e) => e.stopPropagation() || this.setState({ showStatusSelector: false })} className='mx-2'>Cancel</button> 
            </div> 
          }
        </div>
      </div>
    );
  }
}

export default EditTask;