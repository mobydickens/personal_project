import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';
import { userProjects, getMyTeams, userLogin } from '../ducks/reducer';
import ProjectEdit from './ProjectEdit.jsx';
import Backgrounds from './Backgrounds.jsx';
import BackgroundTernary from './BackgroundTernary.jsx';
import Loading from './Loading.jsx';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newProjectModal: false,
      loading: true,
      loggedIn: false,
      projectList: []
    }
  }
  
  //check if logged in
  async loggedIn() {
    let res = await axios.get('/api/get-session');
    if (res) {
      this.props.userLogin({ userId: res.data.id, username: res.data.username, email: res.data.email, projects: res.data.projects, background: res.data.background })
    } else {
      this.props.history.push('/')
    }
  }

  async componentDidMount() {
    let res = await axios.get(`/api/projects`);
    this.props.userProjects(res.data);
    this.setState({
      loading: false,
      loggedIn: true,
      projectList: res.data
    })
    let res2 = await axios.get('/api/teams');
    this.props.getMyTeams(res2.data);
    await this.loggedIn();
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

  componentWillUnmount() {
    this.setState({
      loggedIn: false
    })
  }

  render() {
    let newProjectList = this.state.projectList.map((project, i) => {
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
        <div className='absolute pin-t z-10 w-full'>
          <Header />
        </div>

        {/* Decides which background to show based on what is in redux */}
        <BackgroundTernary />

        <div className='absolute flex justify-center w-screen pt-4 h-screen lg:h-screen'>
          <div className='flex justify-center w-full lg:w-2/3 mt-10'>
            <div className='lg:w-full'>
              {/* if page is loading show loading icon */}
              { this.state.loading ? 
                <div className='mt-8'>
                  <Loading />
                </div>
              : 
              <div>
                <div>
                  {/* this PLUS BUTTON will open the create a new project modal */}
                  { newProjectList[0] ?
                  <div className='flex justify-end'>
                    <div
                      onClick={ () => this.setState({newProjectModal: true}) } 
                      className='text-sm bg-palette-blue rounded-full h-12 w-12 flex items-center justify-center text-white mx-10 my-4 hover:bg-palette-dark cursor-pointer'>
                      {/* THE PLUS BUTTON */}
                      <i className="fas fa-plus m-4 px-8"></i>
                    </div>
                  </div>
                  : "" }
                </div>

                {/* if project list is not empty, show the projects on the page */}
                { newProjectList[0] ?
                <div>
                  <div className='flex flex-col-reverse md:flex-row md:flex-start md:flex-wrap'>
                    {newProjectList.reverse()}
                  </div>

                  {/* background chooser at bottom of page */}
                  <div className='fixed pin-b pin-r m-4'>
                    <Backgrounds />
                  </div>
                 </div>
                 
                // else if project list IS empty, show the start a new project promt
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

        {/* THE START NEW PROJECT MODAL TERNARY */}
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

export default connect(mapStateToProps, { userProjects, getMyTeams, userLogin })(Home);
// md:flex-row md:flex-wrap md:justify-center lg:flex-row lg:flex-wrap lg:justify-start