import React, { Component } from 'react';
import { connect } from 'react-redux';

class TeamList extends Component {


  render() {
    let teamsList = this.props.teams.map(team => {
      return (
        <div key={team.id}>
          {team.name}
        </div>
      )
    })
    console.log(teamsList, this.props.teams)
    return (
      <div>
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
export default connect(mapState)(TeamList);