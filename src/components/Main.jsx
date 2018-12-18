import React, { Component } from 'react';
import MainHeader from './MainHeader';

class Main extends Component {

  signup = () => {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <div>
        <div>
          <MainHeader />
        </div>
        <div>
          <div className='text-2xl mx-4 my-6 lg:m-8 lg:h-32'>Your place for organizing and staying on track.</div>
        </div>
        <div className='flex items-center flex-col'>
          <button
            onClick={ () => this.signup() } 
            className='bg-green hover:bg-green-dark text-white border border-green-base py-2 px-4 m-4 rounded'>
            Sign Up
          </button> 
          <p className='lg:invisible mb-6'>Already a member? 
            <button 
              className='cursor-pointer hover:grey mx-2'> 
              Login
            </button>
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