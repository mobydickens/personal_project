import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <div className={this.props.showSidebar ? 'font-josefin flex flex-col bg-grey absolute pin w-4/5 h-screen' : 'hidden' } >
        <div className='flex'>
          <div className='text-5xl bg-white rounded-full h-16 w-16 flex items-center justify-center text-green m-4'>J</div>
          <div className='text-xl mx-4 my-10'>{this.props.username}</div><br/>
        </div>
        <div className='flex flex-col m-6'>
          <Link to='/home'><button className='p-2' onClick={ () => this.props.hideSidebarFn() }>HOME</button></Link>
          <Link to='/team'><button className='p-2' onClick={ () => this.props.hideSidebarFn() }>NEW TEAM</button></Link>
          <Link to='/editproject'><button className='p-2' onClick={ () => this.props.hideSidebarFn() }>NEW PROJECT</button></Link>
          <Link to='/'><button className='p-2' onClick={ () => this.props.hideAndLogout() }>LOGOUT</button></Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;