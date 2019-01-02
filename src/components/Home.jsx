import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './Header.jsx';
import { Redirect } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { userProjects } from '../ducks/reducer';
import { getMyTeams } from '../ducks/reducer';
import ProjectEdit from './ProjectEdit.jsx';
import Backgrounds from './Backgrounds.jsx';
import BackgroundTernary from './BackgroundTernary.jsx';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newProjectModal: false
    }
  }
  
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

  projectModal = () => {
    this.setState({
      newProjectModal: !this.state.newProjectModal
    })
  }

  render() {
    const { userId, projects, background } = this.props;
    console.log(background);
  
    let projectList = projects.map((project, i) => {
      return (
        <div className='w-auto md:w-1/2 lg:w-1/3' key={i}>
          <div className='shadow-lg border-l-4 border-palette-blue m-4 p-6 rounded-sm lg:my-4 lg:mr-2 bg-palette-white rounded lg:h-32'>
          <div onClick={ () => this.navigateToProject(project.id) }><div className='text-lg cursor-pointer'>{project.title}</div></div>
          {/* displays the team name */}
          <p className='pb-2 text-sm'>{project.name}</p>
          <p className='text-grey-darker text-sm'>{project.description.length > 40 ? project.description.slice(0, 40) + "..." : project.description}</p>
          </div>
        </div>
      )
    })
  
    return (
      <div>
        <Header />
        <BackgroundTernary />

        <div className='absolute flex justify-center w-screen pt-4 h-screen lg:h-screen z-10'>
          <div className='lg:w-3/4'>
            <div className='lg:mt-6'>
            {/* if not logged in, will be redirected to login main page */}
            { !userId ? <Redirect to='/'></Redirect> : 
              <div>
                <div>
                  {/* this link will direct to create project page */}
                  { projectList[0] ?
                  <div className='flex justify-end'>
                    <div
                      onClick={ () => this.setState({newProjectModal: true}) } 
                      className='text-sm bg-palette-blue rounded-full h-12 w-12 flex items-center justify-center text-white mx-10 hover:bg-palette-dark cursor-pointer'>
                      <i className="fas fa-plus m-4 px-8"></i>
                    </div>
                  </div>
                  : "" }
                </div>
                { projectList[0] ?
                <div>
                  <div className='flex flex-col-reverse md:flex-row md:flex-start md:flex-wrap'>
                    {projectList.reverse()}
                  </div>
                  <Backgrounds />
                 </div> 
                : <div className='font-josefin text-2xl m-4'>
                    <div className='flex justify-center lg:w-1/2 bg-white rounded shadow-md text-xl p-8'>
                      <div className='mt-4'>Start a new project!</div>
                      <Link className='no-underline items-center' to='/team'>
                        <div 
                          className='text-2xl bg-palette-blue rounded-full h-12 w-12 flex items-center justify-center text-white mx-10 hover:bg-palette-dark cursor-pointer'>
                          <i className="fas fa-plus m-4 px-8"></i>
                        </div>
                      </Link>
                    </div>
                  </div> } 
              </div>
            }
            </div>
          </div>
        </div>
        {this.state.newProjectModal ?
          <ProjectEdit projectModalFn={this.projectModal} />
        : "" }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    email: state.email,
    username: state.username,
    projects: state.projects,
    background: state.background
  }
}

export default connect(mapStateToProps, { userProjects, getMyTeams })(Home);
// md:flex-row md:flex-wrap md:justify-center lg:flex-row lg:flex-wrap lg:justify-start