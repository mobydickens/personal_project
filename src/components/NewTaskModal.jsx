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
      <div className='fixed pin-r pin-t w-full h-screen'>
        <div className='absolute pin-x pin-t h-64 bg-grey'>
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

export default connect(null)(NewTaskModal);