import React, { Component } from 'react';
// import Task from './Task.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTasks } from '../ducks/reducer';

class Lane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }
  
  async componentDidMount() {
    let res = await axios.get(`/api/tasks?projectid=${this.props.projectId}&status=${this.props.status}`);
    // this.props.getTasks(res.data);
    this.setState({
      tasks: res.data
    })
    console.log("Get all tasks response: ", res.data);
  }
  
  render() {
    let tasks = this.state.tasks.map(task => {
      return (
        <div key={task.id}>
          <div>{task.title}</div>
          <div>{task.description}</div>
        </div>
      )
    })
    return (
      <div className='flex flex-col'>
        {tasks}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}
export default connect(mapStateToProps, { getTasks })(Lane);