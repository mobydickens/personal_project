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
    let login = <div className='flex flex-col lg:flex-row'>
                  <input
                    value={ this.state.email }
                    placeholder='Email'
                    className='login-input border-b lg:border-white focus:outline-none mr-4'
                    onChange={ (e) => this.setState({ email: e.target.value }) } 
                    type="text"/> 
                  <input
                    value={ this.state.password }
                    placeholder='Password'
                    className='login-input border-b lg:border-white focus:outline-none mr-4'
                    onChange={ (e) => this.setState({ password: e.target.value }) } 
                    type="password"/>
                  <div className='flex'>
                  <div>
                    <button
                      className='btn-reg mt-4 hover:bg-palette-dark hover:border-palette-dark mt-0 ml-2' 
                      onClick={ () => this.login() }>LOGIN</button>
                  </div>
                  <div>
                    <button 
                      className='btn-white mt-8'
                      onClick={ () => this.setState({ inputShowing: !this.state.inputShowing }) }>CANCEL
                    </button>
                  </div>
                  </div>
                </div>
    return (
      <div className='bg-palette-grey p-2'>
        <div className='flex justify-between m-2'>
          <div className='jello lg:text-2xl text-white'><span className='text-palette-blue'>J</span>ello</div>
            { this.state.inputShowing ? 
              <div className='hidden lg:block w-full max-w-sm'>
                {login}
              </div> :
              <div className='flex mt-2'>
                <div className='invisible lg:visible text-sm text-white font-josefin'>ALREADY A MEMBER? </div>
                <div onClick={ () => this.showLogin() } className='btn-white text-palette-blue'>LOGIN</div>
              </div>
          }
        </div>
        { this.state.inputShowing ? 
        <div className='lg:hidden m-6 p-2'>
          {login}
        </div>
        : ""
        }
      </div>
    );
  }
}

export default withRouter(connect(null, { userLogin })(MainHeader));