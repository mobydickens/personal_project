import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProjectEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      devHours: '',
      description: '',
      team: '',
      start_date: '',
      edit: false,
      fieldsRequired: false
    }
  }

  async newProject() {
    const { teams } = this.props;
    const { title, devHours, description, start_date } = this.state;
    let team_id = teams.filter(singleteam => singleteam.name === this.state.team);
    //if statement checks if any inputs are empty or unselected
    if(!title || !devHours || !description || !start_date || !team_id[0]) {
      this.setState({
        fieldsRequired: true
      })
    } else {
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
  }

  render() {
    let dropdown = this.props.teams.map((team, i) => {
      return (
        <option key={i} value={team.name}>{team.name}</option>
      )
    })
    return (
        <div className='fixed pin z-50 overflow-auto bg-smoke-light flex'>
          <form className='relative p-8 lg:p-8 bg-white w-full max-w-md m-auto flex-col flex lg:rounded'>
            <div className='flex justify-center'>
              <div className='mb-4 text-xl'>Start a new project</div>
            </div>
            <div className='flex justify-center'>
              {this.state.fieldsRequired ? <div className='text-red-lighter'>All fields required</div> : ""}
            </div>
            <label htmlFor="title">Project Name:</label>
            <input
              autoFocus="autofocus"
              onChange={ (e) => this.setState({ title: e.target.value, fieldsRequired: false })} 
              className='input-underlined focus:outline-none mb-4'  
              type="text" 
              value={ this.state.title}
            />
            <label htmlFor="desc">Description:</label><br/>
            <input 
              onChange={ (e) => this.setState({ description: e.target.value, fieldsRequired: false }) }
              className='input-underlined focus:outline-none' 
            /><br/>
            <select className='bg-grey-light border border-grey focus:outline-none' onChange={ (e) => this.setState( { team: e.target.value, fieldsRequired: false })}>
              <option defaultValue="selected">Choose team</option>
              {dropdown}
            </select><br/>
            <label htmlFor="devhours">Team dev hours available per day:</label>
            <input
              onChange={ (e) => this.setState({ devHours: e.target.value, fieldsRequired: false }) }
              className='input-underlined focus:outline-none'  
              type="number"
              value={ this.state.devHours }
            />
            <label className='my-4' htmlFor="start">Start Date:</label>
            <input
              onChange={ (e) => this.setState({ start_date: e.target.value, fieldsRequired: false })}
              onKeyUp={event => {
                if (event.key === 'Enter') {
                  this.newProject();
                }
              }}
              className='input-underlined focus:outline-none'  
              type="date"/>
            <div className='flex justify-center'>
              <div>
                <button 
                  onClick={ () => this.newProject() } 
                  className='btn-reg hover:bg-palette-dark hover:border-palette-dark m-2'>Submit
                </button>
              </div>
            </div>
            <div className='flex justify-center m-2'>
              <button onClick={ () => this.props.projectModalFn() } className='text-grey'>Cancel</button>
            </div>
          </form>
        </div>
    );
  }
}
function mapState(state) {
  return {
    teams: state.myTeams
  }
}
export default withRouter(connect(mapState)(ProjectEdit));