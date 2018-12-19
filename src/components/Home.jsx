import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { userProjects } from '../ducks/reducer';
import LoggedInHeader from './LoggedInHeader.jsx';
import { Link } from 'react-router-dom';

class Home extends Component {

  async componentDidMount() {
    let res = await axios.get(`/api/projects`);
    this.props.userProjects(res);
    //put this back when kingJoff is not logged in
    // if(res.data.loggedIn) {
    // }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.projects.length !== this.props.projects.length) {
      console.log('deleted')
    }
  }

  deleteProject = (id) => {
    axios.delete(`/api/deleteproject/${id}`).then(res => {
      this.props.userProjects(res);
    });
  }

  render() {
    const { userId, username, projects } = this.props;
    let projectList = projects.map(project => {
      return (
        <div
          key={project.id} 
          className='border border-grey m-2 p-2'>
          <Link to={`/project/${project.id}`}><h4 className='text-black mt-2'>{project.title}</h4></Link>
          <p className='mt-2'>Team {project.name}</p>
          <p className='mt-2'>{project.description}</p>
          <div className='flex'>
            {/* <button onClick={ }className='border'>Edit</button> */}
            <button onClick={ () => this.deleteProject(project.id) } className='border'>Delete</button>
          </div>
        </div>
      )
    })
    return (
      <div>
        <LoggedInHeader />
        <div className='m-6'>{username}, you are logged in.</div>
        <div className='flex justify-center border w-screen'>
          <div className='m-4'>
          { !userId ? "Please log in" : 
            <div className='flex flex-col'>
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