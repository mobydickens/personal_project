import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import Table from './Table.jsx';

class Reports extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }
  
  render() {
    return (
      <div>
        <LoggedInHeader />
        Reports
        <Table />
      </div>
    );
  }
}

export default Reports;