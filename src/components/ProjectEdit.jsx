import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader';
import axios from 'axios';
import { connect } from 'react-redux';
import { getMyTeams } from '../ducks/reducer';


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
  
  async componentDidMount() {
    let res = await axios.get('/api/teams');
    this.props.getMyTeams(res.data);
  }

  async newProject() {
    const { teams } = this.props;
    const { title, devHours, description, start_date } = this.state;
    let team_id = teams.filter(singleteam => singleteam.name === this.state.team);
    try {
      let res = await axios.post('/api/newproject', { title, devHours, description, team_id: team_id[0].id, start_date});
      console.log('success', res);
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
    let dropdown = this.props.teams.map(team => {
      return (
        <option key={team.id} value={team.name}>{team.name}</option>
      )
    })
    return (

      <div>
        <LoggedInHeader />
        <div className='flex flex-col items-center m-6'>
          <div>Start a project</div>
          <form className='bg-grey-lighter flex flex-col w-screen p-6 m-4'>
            <label className='my-4' htmlFor="title">Project Name:</label>
            <input
              onChange={ (e) => this.setState({ title: e.target.value })} 
              className='input-underlined focus:outline-none'  
              type="text" 
              value={ this.state.title}
            />
            <label className='mt-4' htmlFor="desc">Description:</label><br/>
            <textarea 
              onChange={ (e) => this.setState({ description: e.target.value }) }
              className='input-underlined focus:outline-none' 
              rows="3" 
              cols="20">
            </textarea><br/>
            <select onChange={ (e) => this.setState( { team: e.target.value })}>
              <option defaultValue="selected">Choose team</option>
              {dropdown}
            </select><br/>
            <label className='my-4' htmlFor="devhours">Dev hours per day:</label>
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
              className='bg-green border border-green hover:bg-green-dark hover:border-green-dark text-white rounded-full p-2 mt-6'>Submit
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
export default connect(mapState, { getMyTeams })(ProjectEdit);