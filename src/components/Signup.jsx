import React, { Component } from 'react';
import MainHeader from './MainHeader.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { userSignup } from '../ducks/reducer';
import {withRouter} from 'react-router-dom'

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      fieldsRequired: false,
      emailUnavailable: false
    }
    this.signup = this.signup.bind(this);
  }

  async signup() {
    if(!this.state.email || !this.state.username || !this.state.password) {
      this.setState({
        fieldsRequired: true
      })
    } else {
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
        this.setState({
          emailUnavailable: true
        })
      }
    }
  }

  render() {
    return (
      <div className='fixed pin z-50 overflow-auto bg-smoke-light flex'>
        <div className='relative p-8 lg:p-8 bg-white w-full max-w-md m-auto flex-col flex lg:rounded'>
          <div className='flex justify-center'>
            <div className='font-josefin text-5xl bg-white rounded-full h-16 w-16 flex items-center justify-center text-palette-blue m-4'>J</div>
          </div>
          <div className='flex justify-center'>
            {this.state.fieldsRequired ? <div className='text-red-lighter'>All fields required</div> : ""}
            {this.state.emailUnavailable ? <div className='text-red-lighter'>Email already in use</div> : ""}
          </div>
          <input
            onChange={ (e) => this.setState({ email: e.target.value, fieldsRequired: false, emailUnavailable: false }) }
            className='input-underlined focus:outline-none m-2 border-grey'
            value={ this.state.email }
            placeholder='Enter an email' 
            type="text"/>
          <input
            onChange={ (e) => this.setState({ username: e.target.value, fieldsRequired: false }) }
            className='input-underlined focus:outline-none m-2 border-grey' 
            value={ this.state.username }
            placeholder='Enter a username' 
            type="text"/>
          <input
            onChange={ (e) => this.setState({ password: e.target.value, fieldsRequired: false }) }
            className='input-underlined focus:outline-none m-2 border-grey' 
            value={ this.state.password }
            placeholder='Enter a password' 
            type="text"/>
          <button
            onClick={ this.signup }
            className=' self-center btn-reg hover:bg-palette-dark hover:border-palette-dark m-2'>
            Sign Up
          </button>
          <div
            onClick={() => this.props.signupFn()} 
            className='flex justify-center cursor-pointer'>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, {userSignup})(Signup));