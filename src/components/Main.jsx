import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
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
  }

  render() {
    return (
      <div>
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
        <div>
          <div className='text-2xl mx-4 my-6 lg:m-8 lg:h-32'>Your place for organizing and staying on track.</div>
        </div>
        <div className='flex items-center flex-col'>
          <button 
            className='bg-green hover:bg-green-dark text-white border border-green-base py-2 px-4 m-4 rounded'>
            Sign Up
          </button> 
          <p className='lg:invisible mb-6'>Already a member? 
            <button className='cursor-pointer hover:grey'> Login</button>
          </p>
        </div>
        <div className='bg-green w-screen flex flex-col items-center lg:flex-row lg:justify-center'>
          <img
            className='w-3/5 m-6 lg:w-auto lg:h-48'
            src="https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640" 
            alt="placeholder" />
          <img
            className='w-3/5 m-6 lg:w-auto lg:h-48'
            src="https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640" 
            alt="placeholder" />
            <img
            className='w-3/5 m-6 lg:w-auto lg:h-48'
            src="https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640" 
            alt="placeholder" />
        </div>
      </div>
    );
  }
}

export default Main;