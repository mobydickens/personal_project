import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getMyTeams } from '../ducks/reducer';

class TeamList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teamDetails: [],
      showDetails: false,
      currentTeamId: '',
      editing: false,
      newEmail: ''
    }
    this.getTeamDetails = this.getTeamDetails.bind(this);
    this.leaveTeam = this.leaveTeam.bind(this);
    this.add = this.add.bind(this);
  }
  
  async getTeamDetails(id) {
      let res = await axios.get(`/api/teamdetails/${id}`);
      this.setState({
        teamDetails: res.data,
        showDetails: true,
        currentTeamId: id,
      })
  }
  //deletes user from team without deleting team
  async leaveTeam(id) {
    let res = await axios.delete(`/api/leaveteam/${id}`);
    this.props.getMyTeams(res.data);
  }
  //edit by adding new member to team with email
  async add(id) {
    let res = await axios.put('/api/addteammate', { email: this.state.newEmail, team_id: id} );
    this.setState({
      editing: false,
      newEmail: '',
      teamDetails: res.data
    })
  }


  render() {
  
    let teamsList = this.props.teams.map((team, i) => {
      return (
        <div
          key={i}>
          <div className='flex m-6'>
            <i onClick={ () => this.leaveTeam(team.id) } className="far fa-times-circle mr-2 cursor-pointer"></i>
            <div onClick={ () => this.getTeamDetails(team.id) } className='cursor-pointer'>{team.name}</div>
            { this.state.showDetails ? <i onClick={ () => this.setState({ editing: !this.state.editing })} className="fas fa-plus mr-2 cursor-pointer"/> : "" }
            { this.state.editing && this.state.currentTeamId === team.id ? 
              <div>
                <label>Add new teammate by email: </label>
                <div className='flex items-center w-full border-b border-green'>
                  <input
                    onChange={ (e) => this.setState({ newEmail: e.target.value })} 
                    className='input focus:outline-none' 
                    type="text"
                    value={ this.state.newEmail }/>
                  <button onClick={ () => this.add(team.id) }>Add</button>
                </div>
              </div>
              : "" 
            }
          </div>
          {/* show details will allow user to see who is part of each team */}
          { this.state.showDetails ? 
          this.state.teamDetails.map((user, i) => {
            return (
              <div key={i}>
                { this.state.currentTeamId === team.id ?
                <div>
                  <div className='text-grey'>{ user.username }</div>
                </div>
                : "" }
              </div>
            )
          })
          : '' } 
        </div>
      )
    })
    
    return (
      <div className='m-4'>
        Team List:
        {teamsList}
      </div>
    );
  }
}

function mapState(state) {
  return {
    teams: state.myTeams
  }
}
export default connect(mapState, { getMyTeams })(TeamList);