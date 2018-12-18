import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import { connect } from 'react-redux';
import Lane from './Lane.jsx';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      laneNames: ['To Do', 'In Progress', 'Testing', 'Done']
    }
  }
  

  render() {
    let lanes = this.state.laneNames.map((name, i) => {
      return (
        <div
          className='border w-full m-2'
          key={i}>
          <div className='m-6'>{name}</div>
          <Lane projectId={this.props.match.params.id}/>
        </div>
      )
    })
    return (
      <div>
        <LoggedInHeader />
        <h3 className='m-6'>Individual Project View</h3>
        <div className='flex flex-col lg:flex-row m-6'>
          {lanes}
        </div>
      </div>
    );
  }
}

export default connect(null)(Project);