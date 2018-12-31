import React, { Component } from 'react';
import MainHeader from './MainHeader.jsx';
import Signup from './Signup.jsx';

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
      <div>
        <div>
          <MainHeader />
        </div>
        <div className='bg-image-main h-screen'></div>
        {this.state.showSignup ?
        <Signup signupFn={this.signup}/>
        : 
        <div>
          <div className='flex m-2 p-2 flex-col lg:m-6 lg:flex-row lg:justify-center'>
            <div className='flex flex-col w-full lg:w-1/2'>
              <div className='font-josefin p-6 text-3xl lg:text-4xl z-10'>Your place for organizing and staying on track.</div>
              <div className='z-10'>
                <button
                  onClick={ () => this.signup() } 
                  className='bg-palette-grey hover:bg-palette-dark hover:border-palette-dark text-white border border-palette-grey mx-6 lg:mx-12 py-2 lg:py-4 px-4 lg:px-8 text-xl rounded z-10'>
                  Sign Up
                </button> 
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