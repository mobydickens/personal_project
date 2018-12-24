import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader';
import axios from 'axios';
import { connect } from 'react-redux';

class ProjectEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      devHours: '',
      description: '',
      team: '',
      start_date: '',
      edit: false
    }
  }

  async newProject() {
    const { teams } = this.props;
    const { title, devHours, description, start_date } = this.state;
    let team_id = teams.filter(singleteam => singleteam.name === this.state.team);
    try {
      let res = await axios.post('/api/newproject', { title, devHours, description, team_id: team_id[0].id, start_date});
      this.setState({
        title: '',
        devHours: '',
        description: '',
        team: '',
        start_date: ''
      })
      this.props.history.push(`/project/${res.data.project[0].id}`)
    } catch (e) {
      console.log('it errored!', e)
    }
  }

  render() {
    let dropdown = this.props.teams.map((team, i) => {
      return (
        <option key={i} value={team.name}>{team.name}</option>
      )
    })
    return (

      <div>
        <LoggedInHeader />
        <div className='flex flex-col items-center h-screen w-screen bg-grey-light pt-4'>
          <div className='mb-2'>Start a new project</div>
          <form className='shadow-md bg-white flex flex-col w-5/6 p-6 m-4 lg:w-2/5 lg:p-16'>
            <label htmlFor="title">Project Name:</label>
            <input
              onChange={ (e) => this.setState({ title: e.target.value })} 
              className='input-underlined focus:outline-none mb-4'  
              type="text" 
              value={ this.state.title}
            />
            <label htmlFor="desc">Description:</label><br/>
            <input 
              onChange={ (e) => this.setState({ description: e.target.value }) }
              className='input-underlined focus:outline-none' 
            /><br/>
            <select className='bg-grey-light border border-grey focus:outline-none' onChange={ (e) => this.setState( { team: e.target.value })}>
              <option defaultValue="selected">Choose team</option>
              {dropdown}
            </select><br/>
            <label htmlFor="devhours">Team dev hours available per day:</label>
            <input
              onChange={ (e) => this.setState({ devHours: e.target.value }) }
              className='input-underlined focus:outline-none'  
              type="number"
              value={ this.state.devHours }
            />
            <label className='my-4' htmlFor="start">Start Date:</label>
            <input
              onChange={ (e) => this.setState({ start_date: e.target.value })} 
              className='input-underlined focus:outline-none'  
              type="date"/>
            <button 
              onClick={ () => this.newProject() } 
              className='bg-green border border-green hover:bg-green-dark hover:border-green-dark text-white rounded-full p-2 mt-6 lg:mx-24'>Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
function mapState(state) {
  return {
    teams: state.myTeams
  }
}
export default connect(mapState)(ProjectEdit);