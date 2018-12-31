import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetState, resetProject } from '../ducks/reducer';
import Sidebar from './Sidebar.jsx';

class LoggedInHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false
    }
  }
  
  async logout() {
    let res = await axios.get('/auth/logout');
    if(!res.data.loggedIn) {
      this.props.resetState();
      this.props.history.push('/');
    }
  }
  //activated from Sidebar component when Home, New Team, or New Project buttons are clicked
  hideSidebar = () => {
    this.setState({
      showSidebar: false
    })
  }

  //activated from Sidebar component when logout button is clicked
  hideSidebarLogout = () => {
    this.setState({
      showSidebar: false
    })
    this.logout();
  }

  projectClick = () => {
    this.props.history.push('/home')
    this.props.resetProject();
  }

  teamClick = () => {
    this.props.history.push('/team')
    this.props.resetProject();
  }
  
  render() {
    console.log(this.props.history.location)
    return (
      <div className='p-1 bg-palette-grey'>
      {/* sidebar will only show when bars in header are clicked on in phone view */}
        <Sidebar 
          showSidebar={ this.state.showSidebar } 
          username={ this.props.username }
          hideSidebarFn={ this.hideSidebar }
          hideAndLogout={ this.hideSidebarLogout } />
        <div className='flex'>
          <div className='jello lg:text-2xl m-2 mx-6 text-white'><span className='text-palette-blue'>J</span>ello</div>
          <div className='font-josefin m-4 text-grey-lighter text-xs'>Welcome back, {this.props.username}!</div>
        </div>

        {/* The header navigation below is hidden when in phone view, and bar icon will appear */}
        <div className='flex absolute pin-t pin-r invisible lg:visible mx-8 mt-6 font-josefin text-xs'>
          <button 
            onClick={ this.projectClick } 
            className={this.props.history.location.pathname === '/home' ? 'mx-4 hover:text-palette-blue text-palette-blue focus:outline-none' : 'mx-4 text-white hover:text-palette-blue focus:outline-none'}
          >PROJECTS</button>
          <button 
            onClick={ this.teamClick } 
            className={this.props.history.location.pathname === '/team' ? 'mx-4 hover:text-palette-blue text-palette-blue focus:outline-none' : 'mx-4 text-white hover:text-palette-blue focus:outline-none'}>TEAMS
          </button>
          <button 
            onClick={ () => this.logout() }
            className='mx-4 text-white hover:text-palette-blue'>LOGOUT
          </button>
        </div>

        {/* the icon below only shows in phone view - on click will open sidebar for navigation */}
        <div onClick={ () => this.setState({ showSidebar: !this.state.showSidebar }) }>
          <i className="cursor-pointer absolute mx-6 my-4 pin-t pin-r fas fa-bars lg:invisible text-lg text-white"></i>
        </div>
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    username: state.username
  }
}
export default withRouter(connect(mapPropsToState, {resetState, resetProject })(LoggedInHeader));

