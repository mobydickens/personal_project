import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetState } from '../ducks/reducer';

class LoggedInHeader extends Component {

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
        <div className='jello lg:text-3xl'><span className='text-green'>J</span>ello</div>
        <div className='flex absolute pin-t pin-r invisible lg:visible'>
          <Link to='/home'><button>Home</button></Link>
          <Link to='/team'><button className='mx-2'>New Team</button></Link>
          <Link to='/editproject'><button className='mx-2'>New Project</button></Link>
          <button onClick={ () => this.logout() }className='mx-2'>Logout</button>
        </div>
        <div><i className="absolute pin-t pin-r fas fa-bars lg:invisible text-lg"></i></div>
      </div>
    );
  }
}

export default withRouter(connect(null, {resetState})(LoggedInHeader));