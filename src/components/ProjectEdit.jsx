import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader';
import axios from 'axios';


class ProjectEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      devHours: '',
      description: '',
      team: '',
      start_date: '',
      teams: [],
      edit: false
    }
  }
  
  async componentDidMount() {
    let res = await axios.get('/api/teams');
    this.setState({
      teams: res.data
    })
  }

  async newProject() {
    const { title, devHours, description, start_date, teams } = this.state;
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
    let dropdown = this.state.teams.map(team => {
      return (
        <option key={team.id} value={team.name}>{team.name}</option>
      )
    })
    return (

      <div>
        <LoggedInHeader />
        <div className='m-6'>
          <div>Start a project</div>
          <form>
            <label htmlFor="title">Project Name:</label>
            <input
              onChange={ (e) => this.setState({ title: e.target.value })} 
              className='input' 
              type="text" 
              value={ this.state.title}
            />
            <label htmlFor="desc">Description:</label><br/>
            <textarea 
              onChange={ (e) => this.setState({ description: e.target.value }) }
              className='border' 
              rows="5" 
              cols="30">
            </textarea><br/>
            <select onChange={ (e) => this.setState( { team: e.target.value })}>
              <option defaultValue="selected">Choose team</option>
              {dropdown}
            </select><br/>
            <label htmlFor="devhours">Dev hours per day:</label>
            <input
              onChange={ (e) => this.setState({ devHours: e.target.value }) }
              className='input' 
              type="number"
              value={ this.state.devHours }
            />
            <label htmlFor="start">Start Date:</label>
            <input
              onChange={ (e) => this.setState({ start_date: e.target.value })} 
              className='input' 
              type="date"/>
            <button 
              onClick={ () => this.newProject() } 
              className='border'>Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProjectEdit;