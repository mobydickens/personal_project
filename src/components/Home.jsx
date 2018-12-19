import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { userProjects } from '../ducks/reducer';
import LoggedInHeader from './LoggedInHeader.jsx';

class Home extends Component {

  async componentDidMount() {
    let res = await axios.get(`/api/projects`);
    this.props.userProjects(res.data);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.projects.length !== this.props.projects.length) {
    }
  }

  deleteProject = (id) => {
    axios.delete(`/api/deleteproject/${id}`).then(res => {
      this.props.userProjects(res.data);
    });
  }

  navigateToProject = (id) => {
    this.props.history.push(`/project/${id}`)
  }

  render() {
    const { userId, username, projects } = this.props;
    let projectList = projects.map(project => {
      return (
        <div
          key={project.id} 
          className='shadow border-l-8 border-green mx-4 my-4 p-2 rounded-sm w-auto md:w-1/3 lg:w-1/4'>
          <div onClick={ () => this.navigateToProject(project.id) }><h4 className='font-josefin text-xl mb-1 cursor-pointer'>{project.title}</h4></div>
          <p className='pb-2'>{project.name}</p>
          <p>{project.description}</p>
          <div className='flex'>
            {/* <button onClick={ }className='border'>Edit</button> */}
            <button 
              onClick={ () => this.deleteProject(project.id) } 
              className='p-2 text-sm'>Delete</button>
          </div>
        </div>
      )
    })
    return (
      <div>
        <LoggedInHeader />
        <div className='font-josefin m-6'>Welcome back, {username}</div>
        <div className='flex justify-center w-screen'>
          <div>
          { !userId ? "Please log in" : 
            <div className='flex flex-col w-screen md:flex-row md:flex-wrap md:ml-8'>
              {projectList}
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    email: state.email,
    username: state.username,
    projects: state.projects
  }
}

export default connect(mapStateToProps, { userProjects })(Home);
// md:flex-row md:flex-wrap md:justify-center lg:flex-row lg:flex-wrap lg:justify-start