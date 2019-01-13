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
      <div className='bg-main lg:h-screen'>
        <Header />
        {this.state.showSignup ?
        <Signup signupFn={this.signup}/>
        : "" }
        <div className='flex justify-center w-full'>
          <div className='flex m-2 p-2 flex-col lg:my-4 lg:justify-center w-full lg:w-4/5'>
            <div className='flex flex-col w-full'>
              <div className='p-2 font-josefin text-3xl lg:text-4xl z-10 pt-6'>Your place for organizing and staying on track.</div>
              <div className='w-1/2 p-2 text-xl tracking-wide'>Jello is a place to collaborate with your peers on projects. With an easy time logging system, you are able to track tasks and see whether you need to step up your pace to complete on time. Sign up now to get started!</div>
              <div className='z-10'>
                <button
                  onClick={ () => this.signup() } 
                  className='bg-blue hover:bg-blue-dark hover:border-blue-dark text-white border border-blue mx-6 lg:mx-2 py-2 lg:py-4 px-4 lg:px-8 text-xl rounded z-10 my-8'>
                  Sign Up
                </button> 
              </div>
            </div>
            {/* <div className='flex justify-center flex-col lg:flex-row p-6 bg-white shadow-lg rounded-lg'>
              <div className='m-4 lg:w-full box-height rounded'>
                <div className='bg-feature border border-grey rounded image-height shadow'></div>
                <div className='font-josefin text-lg text-center pt-4 lg:pt-8 text-grey-darker'>Log your time</div>
              </div>
              <div className='m-4 lg:w-full box-height rounded'>
                <div className='bg-task border border-grey rounded image-height shadow'></div>
                <div className='font-josefin text-lg text-center pt-4 lg:pt-8 text-grey-darker'>Track task completion</div>
              </div>
              <div className='m-4 lg:w-full box-height rounded'>
                <div className='bg-newproject border border-grey rounded image-height shadow'></div>
                <div className='font-josefin text-lg text-center pt-4 lg:pt-8 text-grey-darker'>Create projects for yourself and teams</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;