import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetState } from '../ducks/reducer';

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

  render() {
    return (
      <div className='flex justify-between m-8'>
        <div className={ this.state.showSidebar ? 'flex bg-grey absolute pin w-4/5 h-screen' : 'hidden' }>
          <div className='font-josefin text-5xl bg-white rounded-full h-16 w-16 flex items-center justify-center text-green m-4'>J</div>
          <div className='font-josefin text-xl mx-4 my-10'>{this.props.username}</div>
        </div>
        <div className='jello lg:text-3xl'><span className='text-green'>J</span>ello</div>
        <div className='flex absolute pin-t pin-r invisible lg:visible'>
          <Link to='/home'><button>Home</button></Link>
          <Link to='/team'><button className='mx-2'>New Team</button></Link>
          <Link to='/editproject'><button className='mx-2'>New Project</button></Link>
          <button onClick={ () => this.logout() }className='mx-2'>Logout</button>
        </div>
        <div onClick={ () => this.setState({ showSidebar: !this.state.showSidebar }) }><i className="cursor-pointer absolute m-8 pin-t pin-r fas fa-bars lg:invisible text-lg"></i></div>
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

//small view, make header show, hide
// { this.state.showSidebar ? }