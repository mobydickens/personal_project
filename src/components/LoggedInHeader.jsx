import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetState } from '../ducks/reducer';
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

  render() {
    return (
      <div className='p-4 border-b border-grey'>
      {/* sidebar will only show when bars in header are clicked on in phone view */}
        <Sidebar 
          showSidebar={ this.state.showSidebar } 
          username={ this.props.username }
          hideSidebarFn={ this.hideSidebar }
          hideAndLogout={ this.hideSidebarLogout } />
        <div className='jello lg:text-3xl mx-4'><span className='text-green'>J</span>ello</div>

        {/* The header navigation below is hidden when in phone view, and bar icon will appear */}
        <div className='flex absolute pin-t pin-r invisible lg:visible m-8 font-josefin text-xs'>
          <Link to='/home'><button className='mx-4 hover:text-green'>PROJECTS</button></Link>
          <Link to='/team'><button className='mx-4 hover:text-green'>TEAMS</button></Link>
          <button onClick={ () => this.logout() }className='mx-4 hover:text-green'>LOGOUT</button>
        </div>

        {/* the icon below only shows in phone view - on click will open sidebar for navigation */}
        <div onClick={ () => this.setState({ showSidebar: !this.state.showSidebar }) }><i className="cursor-pointer absolute mx-6 my-4 pin-t pin-r fas fa-bars lg:invisible text-lg"></i></div>
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    username: state.username
  }
}
export default withRouter(connect(mapPropsToState, {resetState})(LoggedInHeader));

