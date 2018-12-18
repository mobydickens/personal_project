import React, { Component } from 'react';
import MainHeader from './MainHeader.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { userSignup } from '../ducks/reducer';


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
        <div className='flex flex-col justify-center bg-green-dark w-full h-screen lg:bg-white'>
          <div className='flex flex-col self-center bg-white w-5/6 h-auto p-6 lg:w-1/2'>
            <h3 className='self-center'>Welcome to NAME!</h3>
            <input
              onChange={ (e) => this.setState({ email: e.target.value }) }
              className='input' 
              value={ this.state.email }
              placeholder='Enter email' 
              type="text"/>
            <input
              onChange={ (e) => this.setState({ username: e.target.value }) }
              className='input' 
              value={ this.state.username }
              placeholder='Enter username' 
              type="text"/>
            <input
              onChange={ (e) => this.setState({ password: e.target.value }) }
              className='input' 
              value={ this.state.password }
              placeholder='Enter password' 
              type="text"/>
            <button
              onClick={ this.signup }
              className=' self-center bg-green hover:bg-green-dark text-white border border-green-base py-2 px-4 m-4 rounded'>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {userSignup})(Signup);