import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';

class Home extends Component {

  componentDidMount() {

  }

  render() {
    const { userId, username } = this.props;
    return (
      <div>
        <div>Home</div>
        { !userId ? "Please log in" : 
          <div>
            {username}, you are logged In
          </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    email: state.email,
    username: state.username,
    projects: state.projects
  }
}
export default connect(mapStateToProps)(Home);