import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './Header.jsx';
import { userProjects, getMyTeams, userLogin } from '../ducks/reducer';
import ProjectEdit from './ProjectEdit.jsx';
import Backgrounds from './Backgrounds.jsx';
import BackgroundTernary from './BackgroundTernary.jsx';
import Loading from './Loading.jsx';
import { requireLogin } from '../helpers/login_service';

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
  
  async componentDidMount() {
    await requireLogin(this.props.userLogin, this.props.history);
    try {
      let res = await axios.get(`/api/projects`);
        this.props.userProjects(res.data);
        this.setState({
          loading: false,
          loggedIn: true,
          projectList: res.data
        })
        let res2 = await axios.get('/api/teams');
        this.props.getMyTeams(res2.data);
    } catch (error) {
      console.error("Error in Home, failed to load projects in mount", error)
      this.props.history.push('/')
    }
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
          <div className='shadow-lg border-l-4 border-blue m-4 p-6 rounded-sm lg:my-4 lg:mr-2 bg-palette-white rounded lg:h-32'>
          <div onClick={ () => this.navigateToProject(project.id) }><div className='text-lg cursor-pointer'>{project.title}</div></div>
          {/* displays the team name */}
          <p className='pb-2 text-sm'>{project.name}</p>
          <p className='text-grey-darker text-sm'>{project.description.length > 40 ? project.description.slice(0, 50) + "..." : project.description}</p>
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
                  { newProjectList.length && this.state.loading===false?
                  <div className='flex justify-end'>
                    <div
                      onClick={ () => this.setState({newProjectModal: true}) } 
                      className='text-sm bg-blue rounded-full h-12 w-12 flex items-center justify-center text-white mx-10 my-4 hover:bg-blue-darker cursor-pointer shadow-md'>
                      {/* THE PLUS BUTTON */}
                      <i className="fas fa-plus m-4 px-8"></i>
                    </div>
                  </div>
                  : "" }
                </div>

                {/* if project list is not empty, show the projects on the page */}
                { newProjectList.length && this.state.loading===false ?
                <div>
                  <div className='flex flex-col-reverse md:flex-row md:flex-start md:flex-wrap mb-12'>
                    {newProjectList.reverse()}
                  </div>

                  {/* background chooser at bottom of page */}
                  <div className='fixed pin-b pin-r m-4'>
                    <Backgrounds />
                  </div>
                 </div>
                 
                // else if project list IS empty, show the start a new project promt
                : <div className='m-4'>
                    <div className='w-full flex justify-center mt-6'>
                      <div className='flex w-full lg:w-1/2'>
                        <div className='text-2xl my-4 mx-4'>Start your first project!</div>
                        <div
                          onClick={ () => this.setState({ newProjectModal: true }) } 
                          className='text-sm bg-blue rounded-full h-12 w-12 flex items-center justify-center text-white ml-4 mr-2 hover:bg-blue-dark cursor-pointer shadow-md'>
                          <i className="fas fa-plus m-4 px-4"></i>
                        </div>
                      </div>
                    </div>
                    <div className='fixed pin-b pin-r m-4'>
                      <Backgrounds />
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
