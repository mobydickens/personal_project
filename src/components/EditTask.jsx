import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { getTasks } from '../ducks/reducer';

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

  async updateOrderAndStatus(id, index) {
    let res = await axios.put(`/taskstatus/${id}`, { index: index, status: this.state.status });
    this.props.getTasks(res.data);
    this.props.getTasksAndLogs();
    this.setState({
      showStatusSelector: false,
      status: ''
    })
  }

  render() {
    return (
      <div>
        <div className='flex flex-col lg:flex-row lg:justify-between'>
          <div 
            onClick={ () => this.setState({ showTitleInput: true, title: this.props.task.title }) }>
            { !this.state.showTitleInput ? 
              <div className='text-xl'>{this.props.task.title}</div> 
              : 
              <div className='flex flex-col lg:flex-row'>
                <input
                  onChange={ (e) => this.setState({ title: e.target.value}) }
                  className='input focus:outline-none bg-grey-lighter rounded'
                  value={this.state.title}
                  type="text"/>
                <button onClick={ () => this.updateTitle() } className='mx-2'>Save</button>
                <button onClick={ (e) => e.stopPropagation() || this.setState({showTitleInput: false }) } className='mx-2'>Cancel</button> 
              </div> }
          </div>
          <div className='text-smoke'>{moment(this.props.task.created_at).startOf('day').fromNow()}</div>
        </div>
        <div 
          onClick={ () => this.setState({showStatusSelector: true, status: this.props.task.status }) }
          className='my-2'>
          { !this.state.showStatusSelector ? 
            <div className='text-smoke lg:border-b border-grey lg:py-2'>{this.props.task.status}</div>
            : 
            <div className='flex flex-col lg:flex-row lg:border-b border-grey lg:py-2'>
              <select className='focus:outline-none' onChange={ (e) => this.setState( { status: e.target.value })}>
                <option defaultValue="selected">To Do</option>
                <option defaultValue="selected">In Progress</option>
                <option defaultValue="selected">Testing</option>
                <option defaultValue="selected">Done</option>
              </select>
              <button onClick={ () => this.updateOrderAndStatus(this.props.task.id, 0) } className='mx-2'>Save</button>
              <button onClick={ (e) => e.stopPropagation() || this.setState({ showStatusSelector: false })} className='mx-2'>Cancel</button> 
            </div> 
          }
        </div>
        <div 
          onClick={ () => this.setState({ showDescriptionInput: true, description: this.props.task.description }) } 
          className='my-2 lg:my-4'>
          { !this.state.showDescriptionInput ?
            <div>{this.props.task.description}</div>
            :
            <div className='flex flex-col lg:flex-row'>
              <input
                onChange={ (e) => this.setState({ description: e.target.value}) }
                className='input focus:outline-none bg-grey-lighter rounded'
                value={this.state.description}
                type="text"/>
              <button onClick={ () => this.updateDescription() } className='mx-2'>Save</button>
              <button onClick={ (e) => e.stopPropagation() || this.setState({ showDescriptionInput: false })} className='mx-2'>Cancel</button> 
            </div> 
          }
        </div>
      </div>
    );
  }
}

export default connect(null, { getTasks } )(EditTask);