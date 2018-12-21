import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import LoggedInHeader from './LoggedInHeader.jsx';
import { Redirect } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { userProjects } from '../ducks/reducer';
import { getMyTeams } from '../ducks/reducer';

class Home extends Component {

  async componentDidMount() {
    let res = await axios.get(`/api/projects`);
    this.props.userProjects(res.data);
    let res2 = await axios.get('/api/teams');
    this.props.getMyTeams(res2.data);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.projects.length !== this.props.projects.length) {
    }
  }

  navigateToProject = (id) => {
    this.props.history.push(`/project/${id}`)
  }

  render() {
    const { userId, username, projects } = this.props;
    let projectList = projects.map((project, i) => {
      return (
        <div
          key={i} 
          className='shadow border-l-8 border-green mx-4 my-4 p-2 rounded-sm w-auto md:w-1/3 lg:w-1/4 bg-white'>
          <div onClick={ () => this.navigateToProject(project.id) }><div className='font-josefin text-xl mb-1 cursor-pointer'>{project.title}</div></div>
          <p className='pb-2'>{project.name}</p>
          <p>{project.description}</p>
        </div>
      )
    })
    return (
      <div>
        <LoggedInHeader />
        <div className='w-screen h-screen bg-grey-lighter pt-4'>
        <div className='flex justify-between'>
          <div className='font-josefin m-4'>Welcome back, {username}</div>
          <Link className='no-underline' to='/editproject'><div 
            className='text-2xl bg-green rounded-full h-12 w-12 flex items-center justify-center text-white mx-10 hover:bg-green-dark cursor-pointer'>
            <i className="fas fa-plus m-4 px-8"></i>
          </div></Link>
        </div>
          <div className='flex justify-center'>
            <div>
            { !userId ? <Redirect to='/'></Redirect> : 
              <div className='flex flex-col-reverse w-screen md:flex-row md:flex-wrap md:ml-8'>
                {projectList}
              </div>}
            </div>
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

export default connect(mapStateToProps, { userProjects, getMyTeams })(Home);
// md:flex-row md:flex-wrap md:justify-center lg:flex-row lg:flex-wrap lg:justify-start