//lives in project
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


class NewTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: '',
      description: '',
      estimate: '',
      titleRequired: false,
      estimateRequired: false
    }
    this.addTask = this.addTask.bind(this);
  }

  //adds a new task to any of the lanes depending on which status was passed in as props
  async addTask() {
    const { title, description, estimate } = this.state;
    const { status, projectId } = this.props;
    if(!title) {
      this.setState({
        titleRequired: true
      })
    } else if (!estimate) {
      this.setState({
        estimateRequired: true
      })
    } else {
      await axios.post('/api/task', { title, description, estimate, status, projectId });
      this.setState({
        title: '',
        description: '',
        estimate: ''
      })
      this.props.needsUpdateFn();
      this.props.exitModal();
    }
  }

  render() {
    return (
      <div className='fixed pin z-50 overflow-auto bg-smoke-light flex'>
        <div className='relative p-12 bg-white w-full max-w-md m-auto flex-col flex rounded'>
          <button onClick={ () => this.props.exitModal() } className='absolute pin-t pin-r p-4 cursor-pointer'>
            <i className="fas fa-times"></i>
          </button>
          <div className='flex justify-center'>
            <div className='mt-4 text-xl'>New task</div>
          </div>
          <div className='flex justify-center mb-4'>
            {this.state.titleRequired ? <div className='text-red-lighter'>Title required</div> : ""}
            {this.state.estimateRequired ? <div className='text-red-lighter'>Estimate required</div> : ""}
          </div>
          <label>Enter a title:</label><br/>
          <input 
            autoFocus="autofocus"
            className='input-underlined focus:outline-none m-2 border-grey' 
            onChange={ (e) => this.setState({ title: e.target.value, titleRequired: false, estimateRequired: false })} 
            type="text"
            value={ this.state.title }/><br/>
          <label>Description:</label><br/>
          <input 
            className='input-underlined focus:outline-none m-2 border-grey' 
            onChange={ (e) => this.setState({ description: e.target.value, titleRequired: false, estimateRequired: false })} 
            type="text"
            value={ this.state.description }/><br/>
          <label>Initial time estimate (in hours):</label><br/>
          <input 
            className='input-underlined focus:outline-none m-2 border-grey' 
            onChange={ (e) => this.setState({ estimate: e.target.value, titleRequired: false, estimateRequired: false })}
            onKeyUp={event => {
              if (event.key === 'Enter') {
                this.addTask()
              }
            }} 
            type="number"
            value={ this.state.estimate } /><br/>
          <div className='flex justify-end'>
            { !this.state.editing ? 
              <button
                className='btn-reg bg-blue hover:bg-blue-dark hover:border-blue-dark'
                onClick={ () => this.addTask() }>Add</button> 
              : 
              <button
                className='btn-reg bg-blue hover:bg-blue-dark hover:border-blue-dark'  
                onClick={ () => this.editTask() }>Save
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(NewTaskModal);