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
    let login = <div className='flex flex-col lg:flex-row lg:border-b border-green py-2'>
                  <input
                    value={ this.state.email }
                    placeholder='Email'
                    className='input focus:outline-none mb-2'
                    onChange={ (e) => this.setState({ email: e.target.value }) } 
                    type="text"/> 
                  <input
                    value={ this.state.password }
                    placeholder='Password'
                    className='input focus:outline-none mb-2 lg:mb-0'
                    onChange={ (e) => this.setState({ password: e.target.value }) } 
                    type="password"/>
                  <div className='flex'>
                    <div>
                      <button
                        className='flex-no-shrink bg-green hover:bg-green-dark border-green hover:border-green-dark text-sm border-4 text-white py-1 px-2 rounded' 
                        onClick={ () => this.login() }>LOGIN</button>
                    </div>
                    <div>
                      <button 
                        className='btn-white mt-2'
                        onClick={ () => this.setState({ inputShowing: !this.state.inputShowing }) }>CANCEL
                      </button>
                    </div>
                  </div>
                </div>
    return (
      <div>
        <div className='flex justify-between m-6'>
          <div className='jello lg:text-3xl'><span className='text-green'>J</span>ello</div>
            { this.state.inputShowing ? 
              <div className='hidden lg:block w-full max-w-sm'>
                {login}
              </div> :
              <div className='flex'>
                <div className='invisible lg:visible text-sm font-josefin'>ALREADY A MEMBER? </div>
                <div onClick={ () => this.showLogin() } className='btn-white'>LOGIN</div>
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