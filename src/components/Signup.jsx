import React, { Component } from 'react';
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
        <div className='relative p-8 lg:p-8 w-full lg:w-1/4 m-auto flex-col flex lg:rounded bg-white'>
          <div className='flex justify-center'>
            <div 
              className='font-josefin text-5xl bg-palette-blue rounded-full h-16 w-16 flex items-center justify-center text-palette-white m-4'>
              J
            </div>
          </div>
          <div className='flex justify-center'>
            {this.state.fieldsRequired ? <div className='text-red-lighter'>All fields required</div> : ""}
            {this.state.emailUnavailable ? <div className='text-red-lighter'>Email already in use</div> : ""}
          </div>
          <label className='mx-2 mt-1'>Email</label>
          <input
            autoFocus="autofocus"
            onChange={ (e) => this.setState({ email: e.target.value, fieldsRequired: false, emailUnavailable: false }) }
            className='appearance-none bg-transparent text-grey-darker border focus:outline-none py-2 px-4 leading-tight m-4 border-grey rounded'
            value={ this.state.email }
            type="text"/>
          <label className='mx-2 mt-1'>Username</label>
          <input
            onChange={ (e) => this.setState({ username: e.target.value, fieldsRequired: false }) }
            className='appearance-none bg-transparent text-grey-darker border focus:outline-none py-2 px-4 leading-tight m-4 border-grey rounded' 
            value={ this.state.username }
            type="text"/>
          <label className='mx-2 mt-1'>Password</label>
          <input
            onChange={ (e) => this.setState({ password: e.target.value, fieldsRequired: false }) }
            onKeyUp={event => {
              if (event.key === 'Enter') {
                this.signup()
              }
            }}
            className='appearance-none bg-transparent text-grey-darker border focus:outline-none py-2 px-4 leading-tight m-4 border-grey rounded' 
            value={ this.state.password }
            type="text"/>
          <button
            onClick={ this.signup }
            className=' self-center btn-reg hover:bg-palette-dark hover:border-palette-dark m-2'>
            Create Account
          </button>
          <div
            onClick={() => this.props.signupFn()} 
            className='flex justify-center cursor-pointer text-smoke'>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, {userSignup})(Signup));