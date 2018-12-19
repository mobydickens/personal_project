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
        <div className='flex m-2 p-2 flex-col lg:m-12 lg:pt-10 lg:flex-row'>
          <div className='flex flex-col w-full lg:w-1/2'>
            <div className='font-josefin p-6 text-3xl lg:text-4xl lg:p-12'>Your place for organizing and staying on track.</div>
            <div>
              <button
                onClick={ () => this.signup() } 
                className='bg-green hover:bg-green-dark hover:border-green-dark text-white border border-green mx-6 lg:mx-12 py-2 lg:py-4 px-4 lg:px-8 text-xl rounded'>
                Sign Up
              </button> 
            </div>
          </div>
          <div className='p-4 w-full lg:w-1/2'>
            <img src="/images/wordcloud2.png" alt="wordcloud"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;