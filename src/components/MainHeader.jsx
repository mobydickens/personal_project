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
      inputShowing: false,
      incorrectPass: false,
      emailError: false
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
    this.props.userLogin({ userId: res.data.id, username: res.data.username, email: res.data.email, projects: res.data.projects, background: res.data.background })
    if(res.data.loggedIn) {
      this.props.history.push('/home')
    } else {
      if(res.data.message === 'Email not found!') {
        this.setState({
          emailError: true
        })
      } else if(res.data.message === 'Incorrect password')
      this.setState({
        incorrectPass: true
      })
    }
  }

  render() {
    let login = <div className='flex flex-col lg:flex-row'>
                  {this.state.incorrectPass ? <div className='text-red-lighter text-sm'>Incorrect password</div> : ""}
                  {this.state.emailError ? <div className='text-red-lighter text-sm'>Email not found</div> : ""}
                  <input
                    value={ this.state.email }
                    autoFocus="autofocus"
                    placeholder='Email'
                    className='shadow appearance-none rounded w-full py-2 px-3 text-grey-darker leading-tight bg-grey-lightest focus:outline-none focus:shadow-outline lg:bg-palette-grey lg:border-b lg:border-grey-lightest lg:py-0 lg:mx-2 lg:text-grey-lighter'
                    onChange={ (e) => this.setState({ email: e.target.value, incorrectPass: false, emailError: false }) } 
                    type="text"/> 
                  <input
                    value={ this.state.password }
                    placeholder='Password'
                    className='shadow appearance-none rounded w-full py-2 px-3 text-grey-darker leading-tight bg-grey-lightest focus:outline-none focus:shadow-outline mt-2 lg:mt-0 lg:bg-palette-grey lg:border-b lg:border-grey-lightest lg:py-0 lg:text-grey-lighter'
                    onChange={ (e) => this.setState({ password: e.target.value, incorrectPass: false, emailError: false }) } 
                    type="password"/>
                  <div className='flex'>
                  <div>
                    <button
                      className='btn-reg mt-2 hover:bg-palette-dark hover:border-palette-dark ml-2 text-sm lg:mt-0' 
                      onClick={ () => this.login() }>LOGIN</button>
                  </div>
                  <div>
                    <button 
                      className='btn-white mt-6 lg:mt-2'
                      onClick={ () => this.setState({ inputShowing: !this.state.inputShowing, email: '', password: '' }) }>CANCEL
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