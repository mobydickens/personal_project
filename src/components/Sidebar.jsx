import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <div className={this.props.showSidebar ? 'slider visible font-josefin flex flex-col bg-palette-grey absolute pin-t pin-l pin-r h-64 z-20' : 'gone' } >
        <div className='flex'>
          <div className='text-5xl bg-white rounded-full h-16 w-16 flex items-center justify-center text-palette-blue m-4'>J</div>
          <div className='text-xl mx-4 my-10 text-palette-white'>{this.props.username}</div><br/>
          <div onClick={ () => this.props.hideSidebarFn() }><i className="cursor-pointer absolute mx-6 my-4 pin-t pin-r fas fa-bars lg:invisible text-lg text-white"></i></div>
        </div>
        <div className='flex flex-col m-6'>
          <Link to='/home'><button className='p-2 text-palette-white' onClick={ () => this.props.hideSidebarFn() }>PROJECTS</button></Link>
          <Link to='/team'><button className='p-2 text-palette-white' onClick={ () => this.props.hideSidebarFn() }>TEAMS</button></Link>
          <Link to='/'><button className='p-2 text-palette-white' onClick={ () => this.props.hideAndLogout() }>LOGOUT</button></Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;