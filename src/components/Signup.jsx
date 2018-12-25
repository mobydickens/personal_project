import React, { Component } from 'react';
import MainHeader from './MainHeader.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { userSignup } from '../ducks/reducer';
import { Link } from 'react-router-dom';

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    }
    this.signup = this.signup.bind(this);
  }
  
  async signup() {
    let res = await axios.post('/auth/signup', { ...this.state } );
    this.setState({
      email: '',
      username: '',
      password: ''
    })
    this.props.userSignup({ userId: res.data.id, email: res.data.email, username: res.data.username });
    if(res.data.loggedIn) {
      this.props.history.push('/home')
    } else {
      alert(res.data.message);
    }
  }

  render() {
    return (
      <div>
        <MainHeader />
        <div className='fixed pin z-50 overflow-auto bg-smoke-light flex'>
          <div className='relative p-8 lg:p-8 bg-white w-full max-w-md m-auto flex-col flex lg:rounded'>
          <div className='flex justify-center'>
            <div className='font-josefin text-5xl bg-white rounded-full h-16 w-16 flex items-center justify-center text-green m-4'>J</div>
          </div>
            <input
              onChange={ (e) => this.setState({ email: e.target.value }) }
              className='input-underlined focus:outline-none m-2 border-grey'
              value={ this.state.email }
              placeholder='Enter email' 
              type="text"/>
            <input
              onChange={ (e) => this.setState({ username: e.target.value }) }
              className='input-underlined focus:outline-none m-2 border-grey' 
              value={ this.state.username }
              placeholder='Enter username' 
              type="text"/>
            <input
              onChange={ (e) => this.setState({ password: e.target.value }) }
              className='input-underlined focus:outline-none m-2 border-grey' 
              value={ this.state.password }
              placeholder='Enter password' 
              type="text"/>
            <button
              onClick={ this.signup }
              className=' self-center bg-green hover:bg-green-dark text-white border border-green-base py-2 px-4 m-4 rounded-full'>
              Sign Up
            </button>
            <div className='flex justify-center'>
              <Link className='no-underline text-smoke' to='/'>Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {userSignup})(Signup);