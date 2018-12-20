import React, { Component } from 'react';
import axios from 'axios';
import { userProjects } from '../ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      projectDescription: ''
    }
  }
  
  //this component gets the title of the project to display on the page
  async componentDidMount() {
    let res = await axios.get(`/api/project/${this.props.match.params.id}`);
    this.setState({
      projectName: res.data.title,
      projectDescription: res.data.description
    })
  }

   // triggered by close button on this page under the header
   deleteProject = (id) => {
    axios.delete(`/api/deleteproject/${id}`).then(res => {
      this.props.userProjects(res.data);
    });
    this.props.history.push('/home');
  }

  render() {
    return (
      <div>
        <div className='flex justify-between'>
          <h3 className='font-josefin m-6'>{this.state.projectName}</h3>
          <button 
            onClick={ () => this.deleteProject(this.props.match.params.id) } 
            className='p-4 mx-6 text-sm'>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className='mx-6'>{ this.state.projectDescription}</div>
      </div>
    );
  }
}

export default withRouter(connect(null, {userProjects})(ProjectHeader));