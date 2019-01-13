import React, { Component } from 'react';
import Header from './Header.jsx';
import Signup from './Signup.jsx';
import '../images.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSignup: false
    }
  }
  
  signup = () => {
    this.setState({
      showSignup: !this.state.showSignup
    })
  }

  render() {
    return (
      <div className='h-screen'>
        <Header />
        {this.state.showSignup ?
        <Signup signupFn={this.signup}/>
        : 
        <div>
          <div className='flex m-2 p-2 flex-col lg:mx-16 lg:my-8 lg:justify-center'>
            <div className='flex flex-col w-full lg:w-1/2'>
              <div className='font-josefin p-6 text-3xl lg:text-4xl z-10'>Your place for organizing and staying on track.</div>
              <div className='z-10'>
                <button
                  onClick={ () => this.signup() } 
                  className='bg-blue hover:bg-blue-dark hover:border-blue-dark text-white border border-blue mx-6 lg:mx-6 py-2 lg:py-4 px-4 lg:px-8 text-xl rounded z-10'>
                  Sign Up
                </button> 
              </div>
            </div>
            <div className='w-full flex justify-center flex-col lg:flex-row'>
              <div className='m-4 p-6 w-full box-height border-2 border-grey rounded`'>
                <div className='bg-newproject'></div>
              </div>
              <div className='m-4 w-full border-2 border-grey rounded`'>
                <div className='bg-task'></div>
              </div>
              <div className='m-4 p-6 w-full border-2 border-grey rounded`'>
                <div className='bg-feature'></div>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

export default Main;