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
    // this else closes the details on the team if the user clicks the title and it is already open
    if(this.state.currentTeamId === id && this.state.showDetails) {
      this.setState({
        showDetails: false,
        editing: false
      })
    } else {
      this.setState({
        showDetails: false
      })
      let res = await axios.get(`/api/teamdetails/${id}`);
      this.setState({
        teamDetails: res.data,
        showDetails: true,
        currentTeamId: id,
      })
    }
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
          className='flex mt-2 p-4 hover:bg-grey-lighter rounded team-viewer'
          style={{ width: this.state.showDetails && this.state.currentTeamId === team.id ? '280px' : '200px'}}
          key={i}>
          <div className='w-4 h-4 mr-2 bg-palette-blue rounded'></div>
          <div className='flex flex-col'>
            <div className={ !this.state.showDetails ? 'flex' : 'flex justify-between'}>
              <div onClick={ () => this.getTeamDetails(team.id) } className='cursor-pointer'>{team.name}</div>
              {/* This ternary controls whether team details are shown or not */}
              {this.state.showDetails && this.state.currentTeamId === team.id ?
                <div>
                  <div 
                    onClick={ () => this.leaveTeam(team.id) } 
                    className='cursor-pointer text-sm text-white rounded-full py-1 px-2 mr-4 border bg-red border-red'>Leave
                  </div>
                </div> 
              : "" }
            </div>
        {/* //get request for team members on click */}
            {this.state.showDetails && this.state.currentTeamId === team.id ? 
              <div className='flex flex-wrap'>
              {this.state.teamDetails.map((user, i) => {
                return (
                  <div key={i}>
                    <div>
                      <div className='text-white border border-blue bg-blue rounded-full py-1 px-2 m-1'>{ user.username }</div>
                    </div>
                  </div> 
                  )
                })
              }
              <div onClick={ () => this.setState({ editing: !this.state.editing })} className='m-2 text-xl cursor-pointer'> + </div>
            </div> 
            : "" }
          
            { this.state.editing && this.state.currentTeamId === team.id ? 
              <div>
                <div className='flex items-center w-full border border-grey p-2'>
                  <input
                    placeholder='Add new teammate...'
                    onChange={ (e) => this.setState({ newEmail: e.target.value })} 
                    className='input focus:outline-none' 
                    type="text"
                    value={ this.state.newEmail }/>
                  <button className='p-2' onClick={ () => this.add(team.id) }>Add</button>
                </div>
              </div>
              : "" 
            }
          </div>
        </div>
      )
    })
    
    return (
      <div className='flex flex-col m-4 p-4 bg-palette-white rounded'>
        <div className='text-smoke'>Your Teams</div>
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