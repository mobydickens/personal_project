import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { userProjects } from '../ducks/reducer';
import LoggedInHeader from './LoggedInHeader.jsx';
import { Link } from 'react-router-dom';

class Home extends Component {

  async componentDidMount() {
    let res = await axios.get(`/api/projects`);
    if(res.data.loggedIn) {
      this.props.userProjects(res);
    }
  }

  render() {
    const { userId, username, projects } = this.props;
    let projectList = projects.map(project => {
      return (
        <Link key={project.id} to='/project'>
          <div 
            className='border border-grey m-2 p-2 w-64'>
            <h4 className='mt-2'>{project.title}</h4>
            <p>Team {project.name}</p>
            <p>{project.description}</p>
            <p>Start date: {project.start_date}</p>
          </div>
        </Link>
      )
    })
    return (
      <div>
        <LoggedInHeader />
        <div className='m-4'>
        { !userId ? "Please log in" : 
          <div className='flex flex-col w-4/5 lg:flex-row lg:flex-wrap-reverse'>
            <div>{username}, you are logged in.</div>
            {projectList}
          </div>}
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