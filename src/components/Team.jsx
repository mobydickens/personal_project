import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { addNewTeam } from '../ducks/reducer';
import TeamList from './TeamList.jsx';

class Team extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      memberEmail: '',
      teammates: [ 
        { id: this.props.userId, username: this.props.username }
      ],
      newTeammates: [],
      done: false
    }
    this.add = this.add.bind(this);
    this.addTeam = this.addTeam.bind(this);
  }
  
  //this checks whether email is valid in db. If yes, it adds the user to the teammates array. 
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
    this.props.history.push('/editproject');
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
          <p className='p-2'>{user.username}</p>
          { user.username !== this.props.username ? 
            <button 
              onClick={ () => this.deleteFromTeammates(i) }
              className='ml-2 text-grey-dark'>
              X
            </button> : "" }        
        </div>
      )
    })

    return (
      <div className='flex flex-col w-full h-screen'>
        <LoggedInHeader />
        <div className='flex flex-col justify-center items-center'>
          <TeamList />
          <div>Start a new team</div>
          <form className='border flex flex-col p-2'>
            <label>Choose team name: </label>
            <input
              onChange={ (e) => this.setState({ teamName: e.target.value })} 
              className='input-underlined focus:outline-none' 
              type="text" 
              value={ this.state.teamName }
            />
            <label>Enter new teammate's email: </label>
            <div className='flex items-center w-full border-b border-green'>
              <input
                onChange={ (e) => this.setState({ memberEmail: e.target.value })} 
                className='input focus:outline-none' 
                type="text"
                value={ this.state.memberEmail }/>
              <button onClick={ () => this.add() }>Add</button>
            </div>
            
            { !this.state.done ?
              <div className='flex flex-col'>
                <p className='my-4'>Team members:</p>
                <div className='m-2'>{team}</div> 
                <button 
                  className='bg-green border border-green hover:bg-green-dark hover:border-green-dark text-white rounded-full p-2 mt-6' 
                  onClick={ () => this.addTeam() }>
                  Add Team!
                </button>
              </div> 
              :
              <div className='flex flex-col justify-center m-6'>
                <div>Your team has been created!</div>
                <button 
                  onClick={ () => this.props.history.push('/editproject') } 
                  className='bg-green border border-green hover:bg-green-dark hover:border-green-dark text-white rounded-full p-2 mt-6'>Start a Project!
                </button>
              </div> }
          </form>
          
        </div>
      </div>
    );
  }
}
function mapState(state) {
  return {
    userId: state.userId,
    username: state.username,
    email: state.email
  }
}
export default connect(mapState, { addNewTeam })(Team);