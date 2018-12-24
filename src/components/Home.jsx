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
        <div className='w-auto md:w-1/2 lg:w-1/3 h-auto' key={i}>
          <div className='shadow-md border-l-4 border-green m-4 p-6 rounded-sm lg:my-6 lg:mr-2 bg-white rounded-sm'>
          <div onClick={ () => this.navigateToProject(project.id) }><div className='text-lg cursor-pointer'>{project.title}</div></div>
          {/* displays the team name */}
          <p className='pb-2 text-sm'>{project.name}</p>
          <p className='text-grey-darker text-sm'>{project.description.length > 50 ? project.description.slice(0, 50) + "..." : project.description}</p>
          </div>
        </div>
      )
    })
    return (
      <div>
        <LoggedInHeader />
        <div className='flex justify-center w-screen bg-grey-light pt-4 lg:h-screen'>
          <div className='lg:w-3/4'>
            <div className='lg:mt-6'>
            {/* if not logged in, will be redirected to login main page */}
            { !userId ? <Redirect to='/'></Redirect> : 
              <div>
                <div className='flex justify-between'>
                  <div className='font-josefin m-4'>Welcome back, {username}</div>
                  {/* this link will direct to create project page */}
                  <Link className='no-underline' to='/editproject'><div 
                    className='text-2xl bg-green rounded-full h-12 w-12 flex items-center justify-center text-white mx-10 hover:bg-green-dark cursor-pointer'>
                    <i className="fas fa-plus m-4 px-8"></i>
                  </div></Link>
                </div>
                <div className='flex flex-col-reverse md:flex-row md:flex-start md:flex-wrap'>
                  {projectList.reverse()}
                </div> 
              </div>
            }
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