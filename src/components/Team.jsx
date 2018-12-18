import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { addTeamMember } from '../ducks/reducer';

class Team extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      memberEmail: '',
      username: '',
      usernameArray: []
    }
  }
  
  add = () => {
    this.props.addTeamMember(this.state.memberEmail);
    this.state.usernameArray.push(this.state.username);
    this.setState({
      memberEmail: '',
      username: ''
    })
  }

  render() {
    let teamMembers = this.state.usernameArray.map((user, i) => {
      return (
        <div key={i}>
          <p>{user}</p>        
        </div>
      )
    })
    return (
      <div>
        <LoggedInHeader />
        <div className='m-6'>
          <div>Add a new team</div>
          <form>
            <input className='input' placeholder='Team name' type="text" value={ this.state.teamName}/>
            <input className='input' placeholder='Member username' type="text" value={ this.state.username }/>
            <input 
              className='input' 
              placeholder='Member email' 
              type="text"
              value={ this.state.memberEmail }/>
            <button className='border p-2' onClick={ () => this.add() }>Add</button>
            <p>Team members:</p>
            {teamMembers}
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { addTeamMember })(Team);