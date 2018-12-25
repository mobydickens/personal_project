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
      estimate: ''
    }
    this.addTask = this.addTask.bind(this);
  }

  // componentDidMount() {
  //   console.log('running');
  //   //fetch task information -> put get request here
  // }
  //adds a new task to any of the lanes depending on which status was passed in as props
  async addTask() {
    const { title, description, estimate } = this.state;
    const { status, projectId } = this.props;
    await axios.post('/api/task', { title, description, estimate, status, projectId });
    this.setState({
      title: '',
      description: '',
      estimate: ''
    })
    this.props.needsUpdateFn();
    this.props.exitModal();
  }

  render() {
    return (
      <div className='fixed pin z-50 overflow-auto bg-smoke-light flex'>
        <div className='relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded'>
          <button onClick={ () => this.props.exitModal() } className='absolute pin-t pin-r p-4 cursor-pointer'>
            <i className="fas fa-times"></i>
          </button>
          <label>Enter a title:</label><br/>
          <input 
            className='input-underlined focus:outline-none m-2 border-grey px-6' 
            onChange={ (e) => this.setState({ title: e.target.value })} 
            type="text"
            value={ this.state.title }/><br/>
          <label>Description</label><br/>
          <input 
            className='input-underlined focus:outline-none m-2 border-grey px-6' 
            onChange={ (e) => this.setState({ description: e.target.value })} 
            type="text"
            value={ this.state.description }/><br/>
          <label>Initial time estimate (in hours):</label><br/>
          <input 
            className='input-underlined focus:outline-none m-2 border-grey px-6' 
            onChange={ (e) => this.setState({ estimate: e.target.value })} 
            type="number"
            value={ this.state.estimate } /><br/>
          <div className='flex justify-end'>
            { !this.state.editing ? 
              <button
                className='bg-green border border-green hover:bg-green-dark hover:border-green-dark text-white rounded-full p-2 mt-6' 
                onClick={ () => this.addTask() }>Add</button> 
              : <button
                  className='bg-green border border-green hover:bg-green-dark hover:border-green-dark text-white rounded-full px-4 py-2 m-4'  
                  onClick={ () => this.editTask() }>Save</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(NewTaskModal);