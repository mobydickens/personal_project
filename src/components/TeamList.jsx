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
      editing: false
    }
    this.getTeamDetails = this.getTeamDetails.bind(this);
    this.leaveTeam = this.leaveTeam.bind(this);
  }
  
  async getTeamDetails(id) {
    if(this.state.showDetails) {
      this.setState({
        showDetails: false,
        currentTeamId: ''
      })
    } else {
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


  render() {
  
    let teamsList = this.props.teams.map((team, i) => {
      return (
        <div
          key={i}>
          <div className='flex'>
            <i onClick={ () => this.leaveTeam(team.id) } className="far fa-times-circle mr-2 cursor-pointer"></i>
            <div onClick={ () => this.getTeamDetails(team.id) } className='cursor-pointer'>{team.name}</div>
            <button onClick={ () => this.setState({ editing: !this.state.editing })} className='text-grey text-xs px-2'>Edit</button>
          </div>
          {/* show details will allow user to see who is part of each team */}
          { this.state.showDetails ? 
          this.state.teamDetails.map((user, i) => {
            return (
              <div key={i}>
                { this.state.currentTeamId === team.id ?
                <div className='text-grey'>{ user.username }</div>
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