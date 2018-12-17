import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div>
         <div className='xs:text-2xl xs:m-4 lg:text-3xl lg:m-6'>Name</div>
        <div>
          <div className='xs:text-2xl xs:mx-4 xs:my-6 lg:m-8 lg:h-32'>Your place for organizing and staying on track.</div>
        </div>
        <div className='flex items-center flex-col'>
          <button 
            className='bg-green hover:bg-green-dark text-white border border-green-base py-2 px-4 m-4 rounded'>
            Sign Up
          </button> 
          <p className='mb-6'>Already a member? 
            <span className='cursor-pointer hover:grey'> Login</span>
          </p>
        </div>
        <div className='bg-green w-screen flex justify-center'>
          <img
            className='xs:w-3/5 m-6 lg:w-auto lg:h-48'
            src="https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640" 
            alt="placeholder" />
          <img
            className='xs:w-3/5 m-6 lg:w-auto lg:h-48'
            src="https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640" 
            alt="placeholder" />
            <img
            className='xs:w-3/5 m-6 lg:w-auto lg:h-48'
            src="https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640" 
            alt="placeholder" />
        </div>
      </div>
    );
  }
}

export default Main;