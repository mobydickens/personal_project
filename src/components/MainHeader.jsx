import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
    console.log("Data from logging in: ", res.data);
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
                placeholder='Enter email'
                className='shadow appearance-none border border-green rounded w-full h-8 py-2 px-3 my-6 mx-2 text-grey-darker leading-tight focus:outline-none focus:shadow-outline'
                onChange={ (e) => this.setState({ email: e.target.value }) } 
                type="text"/> 
              <input
                value={ this.state.password }
                placeholder='Enter password'
                className='shadow appearance-none border border-green rounded w-full h-8 py-2 px-3 my-6 mx-2 text-grey-darker leading-tight focus:outline-none focus:shadow-outline'
                onChange={ (e) => this.setState({ password: e.target.value }) } 
                type="password"/>
              <button onClick={ () => this.login() } className='m-6 cursor-pointer hover:grey'> Login</button>
            </div> :
            <div className='flex'>
              <div className='visible sm:invisible lg:visible m-6'>Already a member?</div>
              <div onClick={ () => this.showLogin() } className='m-6 cursor-pointer hover:grey'> Login</div>
            </div>
          }
      </div>
    );
  }
}

export default withRouter(MainHeader);