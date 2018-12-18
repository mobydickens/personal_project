import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../ducks/reducer';

class MainHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      inputShowing: false
    }
  }

  showLogin = () => {
    this.setState({
      inputShowing: !this.state.inputShowing
    })
  }

  async login() {
    const { email, password } = this.state;
    let res = await axios.post('/auth/login', { email, password } );
    this.setState({
      email: '',
      password: ''
    })
    this.props.userLogin({ userId: res.data.id, username: res.data.username, email: res.data.email, projects: res.data.projects })
    if(res.data.loggedIn) {
      this.props.history.push('/home')
    } else {
      alert(res.data.message);
    }
  }

  render() {
    return (
      <div className='flex justify-between'>
        <div className='text-2xl m-4 lg:text-3xl lg:m-6'>Name</div>
          { this.state.inputShowing ? 
            <div className='flex'>
              <input
                value={ this.state.email }
                placeholder='Email'
                className='input'
                onChange={ (e) => this.setState({ email: e.target.value }) } 
                type="text"/> 
              <input
                value={ this.state.password }
                placeholder='Password'
                className='input'
                onChange={ (e) => this.setState({ password: e.target.value }) } 
                type="password"/>
              <button onClick={ () => this.login() } className='m-6 cursor-pointer hover:grey'> Login</button>
            </div> :
            <div className='flex'>
              <div className='invisible lg:visible m-6'>Already a member?</div>
              <div onClick={ () => this.showLogin() } className='m-6 cursor-pointer hover:grey'> Login</div>
            </div>
          }
      </div>
    );
  }
}

export default withRouter(connect(null, { userLogin })(MainHeader));