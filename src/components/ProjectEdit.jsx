import React, { Component } from 'react';
import LoggedInHeader from './LoggedInHeader';
import axios from 'axios';


class ProjectEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      devHours: '',
      desc: '',
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
              onChange={ (e) => this.setState({ desc: e.target.value }) }
              className='border' 
              name="description" 
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
            <button className='border'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProjectEdit;