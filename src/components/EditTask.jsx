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
                <button onClick={ () => this.updateTitle() } className='btn-reg bg-blue hover:bg-blue-dark hover:border-blue-dark mx-2'>Save</button>
                <button onClick={ (e) => e.stopPropagation() || this.setState({showTitleInput: false }) } className='mx-2'>Cancel</button> 
              </div> }
          </div>
          <div className='text-smoke'>{moment(this.props.task.created_at).startOf('hour').fromNow()}</div>
        </div>
        <div 
          onClick={ () => this.setState({ showDescriptionInput: true, description: this.props.task.description }) } 
          className='m-2 mb-4 text-sm'>
          { !this.state.showDescriptionInput ?
            <div className='text-sm'>{this.props.task.description}</div>
            :
            <div className='flex flex-col lg:flex-row'>
              <input
                onChange={ (e) => this.setState({ description: e.target.value}) }
                className='input focus:outline-none bg-grey-lighter rounded'
                value={this.state.description}
                type="text"/>
              <button onClick={ () => this.updateDescription() } className='btn-reg bg-blue hover:bg-blue-dark hover:border-blue-dark mx-2'>Save</button>
              <button onClick={ (e) => e.stopPropagation() || this.setState({ showDescriptionInput: false })} className='mx-2'>Cancel</button> 
            </div> 
          }
        </div>
      </div>
    );
  }
}

export default connect(null, { getTasks } )(EditTask);