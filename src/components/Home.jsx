import React, { Component } from 'react';
// import axios from 'axios';

class Home extends Component {

  componentDidMount() {

  }

  render() {
    const { userId } = this.props;
    return (
      <div>
        <div>Home</div>
        { !userId ? "Please log in" : 
          <div>
            Logged In
          </div>}
      </div>
    );
  }
}

export default Home;