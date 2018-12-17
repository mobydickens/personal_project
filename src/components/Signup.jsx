import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return (
      <div className='flex flex-col justify-center bg-green-dark w-full h-screen lg:bg-white'>
        <div className='flex flex-col self-center bg-white w-5/6 h-auto p-6 lg:w-1/2'>
          <h3 className='self-center'>Welcome to NAME!</h3>
          <input
            className='shadow appearance-none border border-green rounded w-full h-8 py-2 px-3 my-6 mx-2 text-grey-darker leading-tight focus:outline-none focus:shadow-outline' 
            placeholder='Enter email' 
            type="text"/>
          <input
            className='shadow appearance-none border border-green rounded w-full h-8 py-2 px-3 my-6 mx-2 text-grey-darker leading-tight focus:outline-none focus:shadow-outline' 
            placeholder='Enter username' 
            type="text"/>
          <input
            className='shadow appearance-none border border-green rounded w-full h-8 py-2 px-3 my-6 mx-2 text-grey-darker leading-tight focus:outline-none focus:shadow-outline' 
            placeholder='Enter password' 
            type="text"/>
          <button
            className=' self-center bg-green hover:bg-green-dark text-white border border-green-base py-2 px-4 m-4 rounded'>
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;