import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { addNewTeam } from '../ducks/reducer';

class Team extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      memberEmail: '',
      teammates: [],
      done: false
    }
  }
  
  //this checks whether email is valid in db. If yes, it adds the member to the teammates array. 
  async add() {
    let res = await axios.get(`/api/member/?email=${this.state.memberEmail}`);
    if(res.data.found) {
      this.state.teammates.push(res.data);
      this.setState({
        memberEmail: ''
      })
    } else {
      alert(res.data.message)
    }
  }

  //sends information we gathered in both inputs to back end to add team to db
  async addTeam() {
    const { teamName, teammates } = this.state;
    this.props.addNewTeam(this.state.teammates);
    await axios.post('/api/newteam', { name: teamName, team: [...teammates] } );
    this.setState({
      teammates: [],
      done: true
    })
  }

  //if you add someone by mistake to your team, this allows you to delete them
  deleteFromTeammates = (i) => {
    const { teammates } = this.state;
    teammates.splice(i, 1);
    this.setState({
      teammates: teammates
    })
  }

  render() {
    let team = this.state.teammates.map((user, i) => {
      return (
        <div className='flex' key={i}>
          <p>{user.username}</p><button onClick={ () => this.deleteFromTeammates(i) }className='border'>Delete</button>        
        </div>
      )
    })

    return (
      <div>
        <LoggedInHeader />
        <div className='m-6'>
          <div>Add a new team</div>
          <form>
            <label>Choose team name: </label>
            <input
              onChange={ (e) => this.setState({ teamName: e.target.value })} 
              className='input' 
              type="text" 
              value={ this.state.teamName}
            />
            <label>Enter email to add teammate: </label>
            <input
              onChange={ (e) => this.setState({ memberEmail: e.target.value })} 
              className='input' 
              type="text"
              value={ this.state.memberEmail }/>
            <button 
              className='border p-2' 
              onClick={ () => this.add() }>Add
            </button>
            
            { !this.state.done ?
              <div>
                <p>Team members:</p>
                <div>{team}</div>
                <button className='border p-2' onClick={ () => this.addTeam() }>Add Team!</button> 
              </div> 
              :
              <div>
                <div>Your team has been started!</div>
                <button onClick={ () => this.props.history.push('/editproject') } className='border p-2'>Start Project!</button>
              </div> }
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { addNewTeam })(Team);