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
      showStatusInput: false
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
              <button className='mx-2'>Cancel</button> 
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
              <button className='mx-2'>Cancel</button> 
            </div> }
        </div>
        {/* <div onClick={  }className='my-2'>In lane: {this.props.task.status}</div> */}
      </div>
    );
  }
}

export default EditTask;