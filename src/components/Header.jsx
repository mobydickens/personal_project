import React, { Component } from 'react';
import {connect} from 'react-redux';
import LoggedInHeader from './LoggedInHeader.jsx';
import MainHeader from './MainHeader.jsx';

class Header extends Component {
  render() {
    return (
      <div>
        {this.props.userId ? <LoggedInHeader /> : <MainHeader /> }
      </div>
    );
  }
}

function mapState (state) {
  return {
    userId: state.userId
  }
}
export default connect(mapState)(Header);