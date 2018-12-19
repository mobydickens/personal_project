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
        <div className='flex m-12 pt-10'>
          <div className='w-1/2'>
            <div className='font-josefin text-4xl p-12'>Your place for organizing and staying on track.</div>
            <button
              onClick={ () => this.signup() } 
              className='bg-green hover:bg-green-dark text-white border border-green py-2 px-4 px-4 rounded'>
              Sign Up
            </button> 
          </div>
          <div className='w-1/2'>
            <img src="/images/wordcloud2.png" alt="wordcloud"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;