import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <div className={this.props.showSidebar ? 'absolute slider visible font-josefin bg-palette-grey pin-t pin-l pin-r h-64 z-40' : 'absolute slider bg-palette-grey pin-l pin-r gone z-40' } >
        <div className='pin-t pin-r pin-l absolute flex justify-between z-40'>
          <div className='text-5xl bg-white rounded-full h-16 w-16 flex items-center justify-center text-palette-blue m-4'>J</div>
          <div className='text-xl my-6 text-palette-white'>{this.props.username}</div><br/>
          <div onClick={ () => this.props.hideSidebarFn() }><i className="cursor-pointer absolute mx-6 my-8 pin-t pin-r fas fa-bars lg:invisible text-lg text-white"></i></div>
        </div>
        <div className='flex flex-col mt-24 mx-8'>
          <Link to='/home'><button className='p-2 text-palette-white' onClick={ () => this.props.hideSidebarFn() }>PROJECTS</button></Link>
          <Link to='/team'><button className='p-2 text-palette-white' onClick={ () => this.props.hideSidebarFn() }>TEAMS</button></Link>
          <Link to='/'><button className='p-2 text-palette-white' onClick={ () => this.props.hideAndLogout() }>LOGOUT</button></Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;